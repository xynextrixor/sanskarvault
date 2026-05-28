import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  const invalidPdfBase64 = Buffer.from("<html><body><h1>Not a PDF</h1></body></html>").toString('base64');
  try {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
            {
                role: "user",
                parts: [
                    {
                        inlineData: {
                            data: invalidPdfBase64,
                            mimeType: "application/pdf"
                        }
                    },
                    {
                        text: "What does this pdf say?"
                    }
                ]
            }
        ]
    });
    console.log(response.text);
  } catch (e) {
      console.log(e);
  }
}
run();
