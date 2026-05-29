import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // --- API Proxy for Supabase ---
  const { createProxyMiddleware } = await import('http-proxy-middleware');
  app.use('/supabase-api', createProxyMiddleware({
    target: 'https://kipfommdgnzjbzwdnnqp.supabase.co',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/supabase-api': '', // remove base path
    }
  }));

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
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.post("/api/test-pdf", async (req, res) => {
    try {
      const { pdfUrl } = req.body;
      const pdfResponse = await fetch(pdfUrl);
      const contentType = pdfResponse.headers.get('content-type');
      const pdfArrayBuffer = await pdfResponse.arrayBuffer();
      const firstBytes = Buffer.from(pdfArrayBuffer).subarray(0, 50).toString('utf-8');
      
      res.json({
         status: pdfResponse.status,
         contentType,
         byteLength: pdfArrayBuffer.byteLength,
         firstBytes: firstBytes,
         ok: pdfResponse.ok
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
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
      res.json({ text: data.choices[0].message.content });
    } catch (e: any) {
      console.error("DeepSeek API error:", e);
      if (e?.message?.toLowerCase().includes("balance")) {
         return res.json({ text: "⚠️ **DeepSeek API Error**: Insufficient Balance.\n\nPlease top up your DeepSeek API account credits to continue using this model." });
      }
      res.json({ text: `⚠️ **DeepSeek Error**: ${e.message || "Failed to communicate with DeepSeek"}` });
    }
  });

  app.get("/api/solveproblem", async (req, res) => {
    try {
      const response = await fetch("https://alfa-leetcode-api.onrender.com/daily");
      if (!response.ok) {
        // Fallback if API is down
        return res.json({
          questionTitle: "Two Sum",
          difficulty: "Easy",
          date: new Date().toISOString().split('T')[0],
          totalSolved: 12151321,
          questionLink: "https://leetcode.com/problems/two-sum"
        });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch solve problem" });
    }
  });

  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages, pdfUrl } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      // We format messages as history for the chat session and last message as the new message
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
               console.log("Rewrote pdfUrl to direct Supabase URL:", fetchUrl);
           }
           const pdfResponse = await fetch(fetchUrl);
           if (pdfResponse.ok) {
             const contentType = pdfResponse.headers.get('content-type') || 'application/pdf';
             console.log("PDF Fetch Content-Type:", contentType);
             
             if (!contentType?.includes('application/pdf') && !pdfUrl.includes('supabase.co')) {
               console.warn("Fetched URL did not return application/pdf. It returned:", contentType);
             }

             const pdfArrayBuffer = await pdfResponse.arrayBuffer();
             if (pdfArrayBuffer.byteLength > 0) {
                 const buffer = Buffer.from(pdfArrayBuffer);
                 const firstBytes = buffer.subarray(0, 100).toString('utf-8');
                 
                 import('fs').then(fs => {
                    fs.writeFileSync('pdf-dl-log.txt', `URL: ${pdfUrl}\nStatus: ${pdfResponse.status}\nContentType: ${contentType}\nLength: ${buffer.length}\nFirst 100 bytes: ${firstBytes}\n---\n`, { flag: 'a' });
                 });

                 // If the file is smaller than 100 bytes and starts with something else...
                 if (!firstBytes.startsWith('%PDF') && contentType.includes('pdf')) {
                    console.warn('Does not start with %PDF. It might not be a valid PDF.');
                 }

                 const pdfBase64 = buffer.toString('base64');
                 // Only attach supported media types to gemini, otherwise it fails
                 const validMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif', 'text/plain', 'text/csv'];
                 const mimeTypeToUse = validMimeTypes.find(t => contentType.includes(t)) || 'application/pdf';
                 
                 pdfDataPart = {
                   inlineData: {
                     data: pdfBase64,
                     mimeType: mimeTypeToUse
                   }
                 };
             } else {
               console.error("PDF fetch returned empty buffer");
             }
           } else {
             console.error(`Failed to fetch PDF for AI: ${pdfResponse.status} ${pdfResponse.statusText}`);
           }
         } catch (e) {
           console.error("Failed to fetch PDF for AI:", e);
         }
      }

      const chatContents = messages.map((m: any, index: number) => {
        const parts: any[] = [{ text: m.content }];
        // Attach the PDF only to the very first user message so the context is established without duplicating bytes
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

        res.json({ text: response.text });
      } catch (geminiError: any) {
        // If it failed specifically because of the PDF (e.g. invalid format), try again without it
        if (pdfDataPart && geminiError?.message?.includes("document has no pages")) {
           console.log("Gemini could not parse the document (no pages fallback). Retrying without document...");
           
           // Remove PDF part from the first message
           chatContents[0].parts = chatContents[0].parts.filter((p: any) => !p.inlineData);
           
           const retryResponse = await ai.models.generateContent({
             model: "gemini-3.5-flash",
             contents: chatContents,
           });
           return res.json({ text: retryResponse.text });
        }
        
        console.error("Gemini API error during generation:", geminiError);
        throw geminiError;
      }
    } catch (error: any) {
      console.error("Gemini API handler error:", error);
      if (error?.status === 429 || error?.code === 429 || error?.message?.includes("429") || error?.message?.includes("Quota") || error?.message?.toLowerCase().includes("quota")) {
         console.log("Gemini quota exceeded. Falling back to DeepSeek...");
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

           if (!dsResponse.ok) {
             const err = await dsResponse.text().catch(() => null);
             throw new Error(err || `DeepSeek API error: ${dsResponse.status}`);
           }

           const data = await dsResponse.json();
           return res.json({ text: data.choices[0].message.content });
         } catch (dsError: any) {
            console.error("DeepSeek fallback error:", dsError);
            return res.json({ text: "⚠️ **API Limits Exceeded**\n\n- **Gemini**: Free tier maximum reached.\n- **DeepSeek**: Insufficient account balance.\n\nPlease top up your DeepSeek account or wait for Gemini limits to reset." });
         }
      }
      res.json({ text: "⚠️ **AI Service Error**: " + (error?.message || "Failed to communicate with AI") });
    }
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
