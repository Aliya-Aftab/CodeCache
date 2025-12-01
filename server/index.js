// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const Snippet = require('./models/Snippet');

// // Middleware (Allows React to talk to Node)
// app.use(cors());
// app.use(express.json());

// // --- CONNECT TO MONGODB ---
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error('DB Connection Error:', err));

// // --- API ROUTES ---

// // 1. GET: Fetch all snippets
// app.get('/api/snippets', async (req, res) => {
//   try {
//     const snippets = await Snippet.find().sort({ createdAt: -1 });
//     res.json(snippets);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. POST: Save a new snippet
// app.post('/api/snippets', async (req, res) => {
//   try {
//     const newSnippet = new Snippet(req.body);
//     const saved = await newSnippet.save();
//     res.json(saved);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 3. DELETE: Remove a snippet
// app.delete('/api/snippets/:id', async (req, res) => {
//   try {
//     await Snippet.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // --- START SERVER ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(` Server running on port ${PORT}`));



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const Snippet = require('./models/Snippet');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(' DB Connection Error:', err));

// --- API ROUTES ---

// 1. GET: Fetch snippets ONLY for the specific user (PRIVATE MODE)
app.get('/api/snippets', async (req, res) => {
  const user = req.query.user; // CRITICAL: This extracts the username (Aliya or Atlas)
  
  try {
    if (!user) {
      // Security Check: Deny if no user is provided
      return res.status(400).json({ error: "Authorization Error: User ID required" });
    }

    // Mongoose Filter: Only finds documents where the 'owner' field MATCHES the username
    const snippets = await Snippet.find({ owner: user }).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. POST: Save new snippet
app.post('/api/snippets', async (req, res) => {
  try {
    // The req.body now includes the 'owner' field from the React app
    const newSnippet = new Snippet(req.body);
    const saved = await newSnippet.save();
    res.json(saved);
  } catch (err) {
    // This catches Mongoose validation errors (e.g., if 'owner' field is missing)
    res.status(500).json({ error: err.message });
  }
});

// 3. DELETE: Remove snippet (by ID)
app.delete('/api/snippets/:id', async (req, res) => {
  try {
    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));