const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    },
    family: 4
  });

  // 2) Define the email options
  const mailOptions = {
    from: `"SMI Sportswear Notifications" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message || options.html.replace(/<[^>]*>?/gm, ''), // Strips HTML for text version
    html: options.html,
    attachments: options.attachments || [],
  };

  // 3) Actually send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✨ [NODE_MAILER] Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('🔥 [NODE_MAILER] Transport Error:', error.message);
    throw error;
  }
};

module.exports = sendEmail;
