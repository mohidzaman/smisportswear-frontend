// Load env vars FIRST - before any other requires that might need them
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug: Check if MONGO_URI is loaded (masked for security)
if (process.env.MONGO_URI) {
  const maskedUri = process.env.MONGO_URI.replace(/\/\/.*@/, '//****:****@');
  console.log(`🔌 [CORE] MONGO_URI loaded: ${maskedUri.substring(0, 40)}...`);
} else {
  console.error('❌ [CORE] MONGO_URI NOT FOUND in .env file!');
}

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const leadRoutes = require('./routes/leads');
const productRoutes = require('./routes/products');
const galleryRoutes = require('./routes/gallery');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

const app = express();

// Middleware - STRICT_DEBUG: Ensure body parsers are active
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/quotes', leadRoutes); // Alias for backward compatibility
app.use('/api/leads', leadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'SMI Sportswear API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed after all retries:', err.message);
    console.log('⚠️  Starting server WITHOUT database (degraded mode)...');
    app.listen(PORT, () => {
      console.log(`⚠️  Server running in DEGRADED MODE on port ${PORT} (no database)`);
    });
  }
};

startServer();
