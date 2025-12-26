const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, default: 'javascript' },
  code: { type: String, required: true },
  tags: [String],
  note: String,
  owner: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Snippet', SnippetSchema);