const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Message = require('../models/Message');

// @route   GET /api/health
// @desc    Check server health
router.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({ 
    status: 'healthy', 
    timestamp: new Date(), 
    database: states[dbState] || 'unknown' 
  });
});

// @route   POST /api/contact
// @desc    Receive contact messages, save to DB (or local JSON fallback), and send email
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Simple validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const messageData = {
    name,
    email,
    subject,
    message,
    createdAt: new Date()
  };

  try {
    let savedMessage = null;
    let savedOffline = false;

    // Check if MongoDB is connected (readyState 1 = connected)
    if (mongoose.connection.readyState === 1) {
      try {
        const newMessage = new Message(messageData);
        // Wait at most 3 seconds for DB write before falling back
        savedMessage = await Promise.race([
          newMessage.save(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 3000))
        ]);
        console.log(`[DB] Saved contact message from: ${email}`);
      } catch (dbErr) {
        console.warn('[DB Error] Failed saving to MongoDB, falling back to local file:', dbErr.message);
        savedOffline = true;
      }
    } else {
      savedOffline = true;
    }

    // Local file fallback
    if (savedOffline) {
      const filePath = path.join(__dirname, '../messages.json');
      let localMessages = [];
      
      try {
        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, 'utf8');
          localMessages = JSON.parse(fileData);
        }
      } catch (err) {
        console.error('Error reading local messages database:', err.message);
      }

      localMessages.push(messageData);

      try {
        fs.writeFileSync(filePath, JSON.stringify(localMessages, null, 2), 'utf8');
        console.log(`[Local Storage] Saved contact message from ${email} to server/messages.json`);
        savedMessage = messageData;
      } catch (writeErr) {
        console.error('[File System Error] Failed to write local fallback message:', writeErr.message);
        throw new Error('All storage engines offline');
      }
    }

    // Setup NodeMailer (optional, uses environment variables)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: email,
          to: process.env.RECEIVER_EMAIL || 'jabhinav198@gmail.com',
          subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        console.log(`[Email] Notification email successfully sent to ${mailOptions.to}`);
      } catch (mailErr) {
        console.warn('[Email Error] Failed to send email alert:', mailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: savedOffline 
        ? 'Message recorded successfully on server storage (Database Offline).' 
        : 'Message saved successfully to database!',
      storageMode: savedOffline ? 'local_file' : 'mongodb',
      data: savedMessage
    });

  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ error: 'Server error, failed to log message.' });
  }
});

module.exports = router;
