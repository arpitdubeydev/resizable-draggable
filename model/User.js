// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  apiCalls: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
