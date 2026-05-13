const mongoose = require('mongoose');

const leadSchema = mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, default: '' },
  country: { type: String, default: '' },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true },
  productType: { type: String, default: '' },
  quantity: { type: Number, default: 0 },
  customDesign: { type: String, default: 'no' },
  uploadedFile: { type: String },
  message: { type: String },
  status: { type: String, default: 'new', enum: ['new', 'contacted', 'sampling', 'production', 'shipped', 'completed', 'cancelled'] },
  internalNotes: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'leads' });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;

