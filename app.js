require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const articleRoutes = require('./routes/articleRoutes');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/beyondchats';
if (!MONGO_URI || (!MONGO_URI.startsWith('mongodb://') && !MONGO_URI.startsWith('mongodb+srv://'))) {
  console.warn('⚠️ MONGO_URI is missing or invalid. Skipping MongoDB connection.');
} else {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err);
    });
}

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRoutes);

const port = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, '0.0.0.0', () => console.log(`🚀 Server is running on port ${port}`));
}

module.exports = app;