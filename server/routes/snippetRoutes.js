const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

//  GET: Fetch user's snippets
// Route: GET /api/snippets
router.get('/', async (req, res) => {
  const user = req.query.user; 
  try {
    if (!user) return res.status(400).json({ error: "User ID required" });
    const snippets = await Snippet.find({ owner: user }).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  POST: Save snippet
// Route: POST /api/snippets
router.post('/', async (req, res) => {
  try {
    const newSnippet = new Snippet(req.body);
    const saved = await newSnippet.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  DELETE: Remove snippet
// Route: DELETE /api/snippets/:id
router.delete('/:id', async (req, res) => {
  try {
    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;