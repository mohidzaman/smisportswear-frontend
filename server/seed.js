const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedAdmin = async () => {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smisportswears', {
      serverSelectionTimeoutMS: 10000
    });
    console.log('Connected to MongoDB.');
    
    const adminExists = await Admin.findOne({ username: 'admin' });
    
    if (adminExists) {
      const targetEmail = process.env.ADMIN_EMAIL || 'admin@smisportswears.com';
      if (adminExists.email !== targetEmail) {
        adminExists.email = targetEmail;
        await adminExists.save();
        console.log(`✅ Admin email updated to: ${targetEmail}`);
      } else {
        console.log('Admin already exists with the correct email. skipping seed.');
      }
      process.exit();
    }

    console.log('Creating default admin account...');
    const admin = new Admin({
      username: 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@smisportswears.com',
      password: process.env.ADMIN_PASSWORD || 'password123',
      role: 'admin'
    });

    await admin.save();
    console.log(`✅ Default Admin Created: admin / password123 (Email: ${admin.email})`);
    process.exit();
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};


seedAdmin();
