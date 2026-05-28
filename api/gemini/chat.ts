export default async function handler(req, res) {
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

    let pdfDataPart = null;
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

    const chatContents = messages.map((m, index) => {
      const parts = [{ text: m.content }];
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
    } catch (geminiError) {
      if (pdfDataPart && geminiError?.message?.includes("document has no pages")) {
         chatContents[0].parts = chatContents[0].parts.filter((p) => !p.inlineData);
         const retryResponse = await ai.models.generateContent({
           model: "gemini-3.5-flash",
           contents: chatContents,
         });
         return res.status(200).json({ text: retryResponse.text });
      }
      throw geminiError;
    }
  } catch (error) {
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
             messages: messages.map((m) => ({
               role: m.role === "user" ? "user" : "assistant",
               content: m.content
             }))
           })
         });

         const data = await dsResponse.json();
         return res.status(200).json({ text: data.choices[0].message.content });
       } catch (dsError) {
          return res.status(200).json({ text: "⚠️ **API Limits Exceeded**\n\n- **Gemini**: Free tier maximum reached.\n- **DeepSeek**: Insufficient account balance.\n\nPlease top up your DeepSeek account or wait for Gemini limits to reset." });
       }
    }
    return res.status(200).json({ text: "⚠️ **AI Service Error**: " + (error?.message || "Failed to communicate with AI") });
  }
}
