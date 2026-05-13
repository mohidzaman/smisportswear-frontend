const express = require('express');
const router = express.Router();
const Lead = require('../models/Quote');
const protect = require('../middleware/auth');
const upload = require('../middleware/upload');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit a new lead/quote
// @route   POST /api/leads
// STRICT_DEBUG: Handle 'design' field for file uploads
router.post('/', upload.single('design'), async (req, res) => {
  console.log('🚀 [BACKEND_RECEIVE] Incoming Request Arrival');
  
  try {
    // Step 1: Trace Request Body
    console.log('📝 [BACKEND_RECEIVE] Body Trace:', req.body);

    // Step 2: Trace Request File
    if (req.file) {
        console.log('📁 [BACKEND_RECEIVE] File Trace:', {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            destination: req.file.destination,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        });
    } else {
        console.warn('⚠️ [BACKEND_RECEIVE] No file received under "design" key.');
    }

    const { name, company, country, whatsapp, email, productType, quantity, message } = req.body;
    
    // Quick validation
    if (!name || !email || !whatsapp) {
      console.warn('❌ [BACKEND_RECEIVE] Validation Failed: Missing core fields', { name, email, whatsapp });
      return res.status(400).json({ 
        success: false,
        message: 'Name, Email, and WhatsApp are required.' 
      });
    }

    // Formation of File URL
    const uploadedFile = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '';
    console.log('🔗 [BACKEND_RECEIVE] Generated File URL:', uploadedFile || 'NONE');

    // Step 3: Database Save Attempt
    console.log('🗄️ [DB_SAVE_START] Attempting lead storage...');
    const lead = new Lead({
      name, company, country, whatsapp, email, productType, quantity, message, uploadedFile
    });
    
    try {
        const savedLead = await lead.save();
        console.log('✅ [DB_SAVE_STATUS] SUCCESS:', savedLead._id);
        
        // Step 4: Final Response Send
        console.log('📤 [BACKEND_RESPOND] Sending Success JSON...');
        res.status(201).json({ 
          success: true, 
          message: 'Lead submitted successfully',
          data: savedLead 
        });

        // Trigger email notifications (Admin + Customer)
        await Promise.all([
          sendEmailNotification(savedLead, name, email, company, country, whatsapp, productType, quantity, message, uploadedFile),
          sendCustomerConfirmation(name, email, productType)
        ]).catch(err => console.error('📧 [EMAIL_BATCH_ERROR]:', err.message));
        
    } catch (dbErr) {
        console.error('❌ [DB_SAVE_STATUS] FAILED:', dbErr.message);
        res.status(500).json({ success: false, message: 'Database failure', error: dbErr.message });
    }

  } catch (error) {
    console.error('💥 [CRITICAL_FAILURE]:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// Helper for Background Email
async function sendEmailNotification(lead, name, email, company, country, whatsapp, productType, quantity, message, uploadedFile) {
    try {
      console.log(`📧 [EMAIL_SEND] Attempting admin notification to: ${process.env.ADMIN_EMAIL}`);
      const emailOptions = {
        email: process.env.ADMIN_EMAIL,
        subject: `🔥 New Lead Received: ${name} (${productType})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #c1121f;">SMI Sportswear - New Lead Received</h2>
            <p>You have a new inquiry from the website:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${company || 'N/A'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Country:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${country}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>WhatsApp:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${whatsapp}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Product:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${productType}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Quantity:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${quantity} units</td></tr>
            </table>
            <p><strong>Message:</strong></p>
            <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message || 'No additional notes provided.'}</p>
            ${uploadedFile ? `<p><strong>Attachment:</strong> <a href="${uploadedFile}">${uploadedFile}</a></p>` : ''}
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">This email was automatically generated by the SMI Sportswear Lead System.</p>
          </div>
        `
      };
      await sendEmail(emailOptions);
      console.log('✅ [EMAIL_STATUS] Admin Notification Sent');
    } catch (emailErr) {
      console.error('❌ [EMAIL_STATUS] Admin Notification Failed:', emailErr.message);
    }
}

async function sendCustomerConfirmation(name, email, productType) {
    try {
      console.log(`📧 [EMAIL_SEND] Attempting customer confirmation to: ${email}`);
      const emailOptions = {
        email: email,
        subject: `SMI Sportswear - We've Received Your Quote Request`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #c1121f;">Hello ${name},</h2>
            <p>Thank you for choosing <strong>SMI Sportswear</strong>. We have received your request for <strong>${productType}</strong>.</p>
            <p>Our production manager is reviewing your requirements and will contact you within 24 hours via email or WhatsApp to discuss the next steps and provide a custom quotation.</p>
            <p>In the meantime, feel free to visit our <a href="https://smisportswear.com/products">catalog</a> to see more of our work.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 14px;"><strong>The SMI Sportswear Team</strong></p>
            <p style="font-size: 12px; color: #999;">Quality without compromise.</p>
          </div>
        `
      };
      await sendEmail(emailOptions);
      console.log('✅ [EMAIL_STATUS] Customer Confirmation Sent');
    } catch (emailErr) {
      console.error('❌ [EMAIL_STATUS] Customer Confirmation Failed:', emailErr.message);
    }
}

// @desc    Get all leads (Admin only)
// @route   GET /api/leads
router.get('/', protect, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    console.log(`🔍 [LEAD_FETCH] Found ${leads.length} leads in database.`);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update lead status (Admin only)
// @route   PUT /api/leads/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    lead.status = req.body.status || lead.status;
    lead.internalNotes = req.body.internalNotes || lead.internalNotes;
    const updatedLead = await lead.save();
    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete lead (Admin only)
// @route   DELETE /api/leads/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ message: 'Lead removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
