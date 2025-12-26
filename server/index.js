
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// import routes
const snippetRoutes = require('./routes/snippetRoutes');
const authRoutes = require('./routes/authRoutes');

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('DB Connection Error:', err));

// use routes-
// This tells the server: "If a request starts with /api/auth, send it to authRoutes"
app.use('/api/auth', authRoutes);

// "If a request starts with /api/snippets, send it to snippetRoutes"
app.use('/api/snippets', snippetRoutes);


//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));