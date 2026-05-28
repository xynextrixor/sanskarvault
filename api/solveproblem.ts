export default async function handler(req, res) {
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
}
