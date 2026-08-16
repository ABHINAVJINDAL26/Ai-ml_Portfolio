// Serverless Health Check Endpoint
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json({
    status: 'operational',
    service: 'Abhinav Jindal Portfolio API',
    uptime: '99.99%',
    edgeRegion: process.env.VERCEL_REGION || 'local',
    timestamp: new Date().toISOString()
  });
};
