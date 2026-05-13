const mongoose = require('mongoose');

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;

const connectDB = async (retryCount = 0) => {
  if (!process.env.MONGO_URI) {
    console.error('❌ [CORE] MONGO_URI is not defined in environment variables.');
    throw new Error('Database URI missing');
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log(`✅ [CORE] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Attempt ${retryCount + 1}/${MAX_RETRIES} Failed: ${error.message}`);
    if (retryCount < MAX_RETRIES - 1) {
      console.log(`⏳ Retrying in ${RETRY_DELAY / 1000}s...`);
      await new Promise(res => setTimeout(res, RETRY_DELAY));
      return connectDB(retryCount + 1);
    }
    throw error;
  }
};

module.exports = connectDB;
