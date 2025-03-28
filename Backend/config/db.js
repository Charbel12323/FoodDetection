// db.js
const { Pool } = require('pg');

// Configure your connection pool
const pool = new Pool({
  user: process.env.DB_USER ,
  host: process.env.DB_HOST ,
  database: process.env.DB_NAME ,
  password: process.env.DB_PASSWORD ,
  port: process.env.DB_PORT || 5432,
});

// Export the pool instance so that it can be reused (singleton)
module.exports = pool;
