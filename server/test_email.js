const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

const sendEmail = require('./utils/sendEmail');

const sendTestEmail = async () => {
  try {
    console.log('Attempting to send test email...');
    await sendEmail({
      email: process.env.ADMIN_EMAIL,
      subject: '🧪 SMI Sportswear - Test Email',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #c1121f;">Test Email Successful</h2>
          <p>This is a test email from the SMI Sportswear server.</p>
          <p>If you received this, your SMTP configuration is working correctly!</p>
          <hr />
          <p style="font-size: 12px; color: #999;">Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `
    });
    console.log('✅ Test email sent successfully to:', process.env.ADMIN_EMAIL);
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
    process.exit(1);
  }
};

sendTestEmail();
