// db.js
const { Pool } = require('pg');

// Configure your connection pool
const pool = new Pool({
  user: 'postgres',       // Replace with your PostgreSQL username
  host: 'localhost',           // Server address
  database: 'fridgeapp',   // Replace with your database name
  password: 'Charbs123',   // Replace with your database password
  port: 5432,                  // Default PostgreSQL port
});

// Export the pool instance so that it can be reused (singleton)
module.exports = pool;
