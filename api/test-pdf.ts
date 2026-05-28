export default async function handler(req, res) {
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
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
