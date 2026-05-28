import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// --- API Routes ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/news", async (req, res) => {
  try {
    const query = req.query.q ? String(req.query.q) : "technology OR AKTU OR BCA";
    const apiKey = process.env.NEWS_API_KEY || "81a6732ab18e4f66ad7a65b2e4f780bf";
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}&sortBy=publishedAt&language=en`;
    
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      console.error("News API returned non-OK:", response.status, text);
      return res.status(response.status).json({ error: "Failed to fetch news" });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.post("/api/test-pdf", async (req, res) => {
  try {
    const { pdfUrl } = req.body;
    const pdfResponse = await fetch(pdfUrl);
    const contentType = pdfResponse.headers.get('content-type');
    const pdfArrayBuffer = await pdfResponse.arrayBuffer();
    const firstBytes = Buffer.from(pdfArrayBuffer).subarray(0, 50).toString('utf-8');
    
    return res.status(200).json({
       status: pdfResponse.status,
       contentType,
       byteLength: pdfArrayBuffer.byteLength,
       firstBytes: firstBytes,
       ok: pdfResponse.ok
    });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
});

app.post("/api/deepseek/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: messages.map((m: any) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content
        }))
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.error?.message || `DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({ text: data.choices[0].message.content });
  } catch (e: any) {
    console.error("DeepSeek API error:", e);
    if (e?.message?.toLowerCase().includes("balance")) {
       return res.status(200).json({ text: "⚠️ **DeepSeek API Error**: Insufficient Balance.\n\nPlease top up your DeepSeek API account credits to continue using this model." });
    }
    return res.status(200).json({ text: `⚠️ **DeepSeek Error**: ${e.message || "Failed to communicate with DeepSeek"}` });
  }
});

app.get("/api/solveproblem", async (req, res) => {
  try {
    const response = await fetch("https://leetcode-api-faisalshohag.vercel.app/daily");
    if (!response.ok) {
      const text = await response.text();
      console.error("LeetCode API returned non-OK:", response.status, text);
      return res.status(response.status).json({ error: "Failed to fetch solve problem" });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch solve problem" });
  }
});

app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages, pdfUrl } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    let pdfDataPart: any = null;
    if (pdfUrl) {
       try {
         let fetchUrl = pdfUrl;
         if (fetchUrl.includes('/supabase-api/')) {
             fetchUrl = fetchUrl.replace(/^.*\/supabase-api\//, 'https://kipfommdgnzjbzwdnnqp.supabase.co/');
         }
         const pdfResponse = await fetch(fetchUrl);
         if (pdfResponse.ok) {
           const contentType = pdfResponse.headers.get('content-type') || 'application/pdf';
           const pdfArrayBuffer = await pdfResponse.arrayBuffer();
           if (pdfArrayBuffer.byteLength > 0) {
               const buffer = Buffer.from(pdfArrayBuffer);
               const pdfBase64 = buffer.toString('base64');
               const validMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif', 'text/plain', 'text/csv'];
               const mimeTypeToUse = validMimeTypes.find(t => contentType.includes(t)) || 'application/pdf';
               
               pdfDataPart = {
                 inlineData: {
                   data: pdfBase64,
                   mimeType: mimeTypeToUse
                 }
               };
           }
         }
       } catch (e) {
         console.error("Failed to fetch PDF for AI:", e);
       }
    }

    const chatContents = messages.map((m: any, index: number) => {
      const parts: any[] = [{ text: m.content }];
      if (index === 0 && m.role === 'user' && pdfDataPart) {
         parts.unshift(pdfDataPart);
      }
      return {
        role: m.role === 'user' ? 'user' : 'model',
        parts
      };
    });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
      });

      return res.status(200).json({ text: response.text });
    } catch (geminiError: any) {
      if (pdfDataPart && geminiError?.message?.includes("document has no pages")) {
         chatContents[0].parts = chatContents[0].parts.filter((p: any) => !p.inlineData);
         const retryResponse = await ai.models.generateContent({
           model: "gemini-3.5-flash",
           contents: chatContents,
         });
         return res.status(200).json({ text: retryResponse.text });
      }
      throw geminiError;
    }
  } catch (error: any) {
    if (error?.status === 429 || error?.code === 429 || error?.message?.includes("429") || error?.message?.toLowerCase().includes("quota")) {
       try {
         const messages = req.body.messages;
         const dsResponse = await fetch("https://api.deepseek.com/v1/chat/completions", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
           },
           body: JSON.stringify({
             model: "deepseek-chat",
             messages: messages.map((m: any) => ({
               role: m.role === "user" ? "user" : "assistant",
               content: m.content
             }))
           })
         });

         const data = await dsResponse.json();
         return res.status(200).json({ text: data.choices[0].message.content });
       } catch (dsError: any) {
          return res.status(200).json({ text: "⚠️ **API Limits Exceeded**\n\n- **Gemini**: Free tier maximum reached.\n- **DeepSeek**: Insufficient account balance.\n\nPlease top up your DeepSeek account or wait for Gemini limits to reset." });
       }
    }
    return res.status(200).json({ text: "⚠️ **AI Service Error**: " + (error?.message || "Failed to communicate with AI") });
  }
});

export default app;
