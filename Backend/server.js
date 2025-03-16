// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const os = require('os');

// Import your modular routes
const authRoutes = require('./routes/authRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const openaiRoutes = require('./routes/openaiRoutes');
// If you have Gemini integration, uncomment the next line:
const geminiRoutes = require('./routes/geminiRoutes');

const app = express();
const port = process.env.PORT || 3000;

/**
 * Helper function to get the local IP address
 * for easier local network testing.
 */
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const iface = interfaces[interfaceName];
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost';
}

// Middleware
app.use(express.json({ limit: '30mb' }));
app.use(cors());

// Register modular routes
app.use('/api', authRoutes);
app.use('/api', ingredientRoutes);
app.use('/api', openaiRoutes);
// If using Gemini, register its routes:
app.use('/api', geminiRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`➡️  Local:   http://localhost:${port}`);
  console.log(`➡️  Network: http://${getLocalIPAddress()}:${port}`);
});
