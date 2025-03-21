require('dotenv').config();

const express = require('express');
const cors = require('cors');
const os = require('os');

const authRoutes = require('./routes/authRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const openaiRoutes = require('./routes/openaiRoutes');
const geminiRoutes = require('./routes/geminiRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json({ limit: '30mb' }));
app.use(cors());

// Register modular routes
app.use('/api', authRoutes);
app.use('/api', ingredientRoutes);
app.use('/api', openaiRoutes);
app.use('/api', geminiRoutes);
app.use('/api', recipeRoutes);

// ✅ Only start the server if NOT running in a test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
}

// ✅ Export app for Supertest (without running server)
module.exports = app;
