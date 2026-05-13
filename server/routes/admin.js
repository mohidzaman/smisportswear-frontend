const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const protect = require('../middleware/auth');
const Lead = require('../models/Quote');
const Product = require('../models/Product');
const Gallery = require('../models/Gallery');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const admin = await Admin.findOne({ 
      $or: [
        { username: username },
        { email: username }
      ]
    });

    if (admin && (await admin.matchPassword(password))) {
      console.log(`✅ Login successful for: ${admin.username}`);
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      console.warn(`❌ Login failed for: ${username}`);
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @desc    Validate token and get admin info
// @route   GET /api/admin/me
router.get('/me', protect, async (req, res) => {
  res.json(req.admin);
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
router.get('/stats', protect, async (req, res) => {
  try {
    const [totalLeads, totalProducts, totalGallery] = await Promise.all([
      Lead.countDocuments(),
      Product.countDocuments(),
      Gallery.countDocuments(),
    ]);
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const processing = await Lead.countDocuments({ status: { $in: ['sampling', 'production'] } });

    res.json({
      totalLeads,
      newLeads,
      processing,
      totalProducts,
      totalGallery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
