// pages/api/status.js
export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    message: "Hello World!!! (safe server)",
    timestamp: new Date().toISOString()
  });
}
