export default async function handler(req, res) {
  try {
    const query = req.query.q ? String(req.query.q) : "technology OR AKTU OR BCA";
    const apiKey = process.env.NEWS_API_KEY || "81a6732ab18e4f66ad7a65b2e4f780bf";
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}&sortBy=publishedAt&language=en`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const text = await response.text();
      console.error("News API returned non-OK:", response.status, text);
      
      // FALLBACK TO DUMMY DATA IN CASE NEWS API BLOCKS THE VERCEL SERVER
      if (response.status === 426 || response.status === 403) {
         return res.status(200).json({
            articles: [
               { title: "Vercel Deployment Tips", description: "Vercel deployments work seamlessly with serverless functions.", source: { name: "Vercel Guide" }, url: "#" },
               { title: "Tech News Blocked by Provider", description: "The News API provider blocks requests from the Vercel cloud by default on the free tier.", source: { name: "System Message" }, url: "#" }
            ]
         });
      }
      return res.status(response.status).json({ error: "Failed to fetch news" });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}
