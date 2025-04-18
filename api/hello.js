// Simple test endpoint for Vercel deployment

module.exports = (req, res) => {
  res.status(200).json({
    message: "Khan Traders API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
}; 