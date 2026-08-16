// Serverless Function for Vercel / Netlify Edge API
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required parameters: name, email, and message.' });
  }

  const recipientEmail = process.env.RECEIVER_EMAIL || 'jabhinav198@gmail.com';

  try {
    // If SMTP / Gmail credentials configured in Vercel environment variables
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `[Portfolio High-Priority] ${subject || 'General Inquiry'} - from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #38bdf8; padding-bottom: 8px;">New Portfolio Inquiry</h2>
            <p><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
            <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #38bdf8;">
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Delivered via Abhinav Jindal's Serverless Portfolio Relay Engine</p>
          </div>
        `
      });

      return res.status(200).json({
        success: true,
        message: 'Transmission dispatched successfully to ' + recipientEmail,
        mode: 'smtp_serverless'
      });
    }

    // Fallback: If no SMTP credentials provided, return acknowledge response
    return res.status(200).json({
      success: true,
      message: 'Packet accepted by Serverless Gateway for ' + recipientEmail,
      mode: 'edge_serverless'
    });

  } catch (error) {
    console.error('[Serverless Mail Error]:', error);
    return res.status(500).json({
      error: 'Failed to process message transmission.',
      details: error.message
    });
  }
};
