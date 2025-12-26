
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique prevents duplicate accounts
  password: { type: String, required: true }, // This will store the HASH, not the real password
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);