export default async function handler(req, res) {
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
        messages: messages.map((m) => ({
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
  } catch (e) {
    console.error("DeepSeek API error:", e);
    if (e?.message?.toLowerCase().includes("balance")) {
       return res.status(200).json({ text: "⚠️ **DeepSeek API Error**: Insufficient Balance.\n\nPlease top up your DeepSeek API account credits to continue using this model." });
    }
    return res.status(200).json({ text: `⚠️ **DeepSeek Error**: ${e.message || "Failed to communicate with DeepSeek"}` });
  }
}
