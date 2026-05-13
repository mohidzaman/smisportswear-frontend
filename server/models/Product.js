const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true }, // Teamwear, Training, etc.
  image: { type: String, required: true },
  MOQ: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
