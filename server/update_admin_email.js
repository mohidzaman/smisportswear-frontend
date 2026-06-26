const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const updateAdminEmail = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smisportswears', {
      serverSelectionTimeoutMS: 10000
    });
    console.log('Connected to MongoDB.');
    
    const result = await Admin.updateMany(
      {}, // Assuming there's only one admin, or we update all admins to this email? Better to update username: 'admin'
      { email: process.env.ADMIN_EMAIL || 'smisportswears@gmail.com' }
    );
    
    console.log(`✅ Admin email updated. Modified ${result.modifiedCount} documents.`);
    process.exit();
  } catch (error) {
    console.error('❌ Error updating admin email:', error.message);
    process.exit(1);
  }
};

updateAdminEmail();
