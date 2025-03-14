require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const openaiRoutes = require('./routes/openaiRoutes');

const app = express();
const port = process.env.PORT || 3000;

const os = require('os');

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

app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Register modular routes
app.use('/api', authRoutes);
app.use('/api', ingredientRoutes);
app.use('/api', openaiRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`➡️  Local:   http://localhost:${port}`);
  console.log(`➡️  Network: http://${getLocalIPAddress()}:${port}`);
});
