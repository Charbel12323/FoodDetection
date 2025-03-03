// server.js
const express = require('express');
const pool = require('./db');  // Singleton connection pool from earlier
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());
// Endpoint for user sign-up
// Endpoint for user sign-up
app.post('/api/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;  // use 'username' instead of 'name'
  
      // Check if the user already exists
      const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password before storing it
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Insert the new user with the hashed password into the correct columns
      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error during sign-up:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Endpoint for user log-in
// Endpoint for user log-in
app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
      const user = result.rows[0];
  
      // Compare the provided password with the hashed password stored in the database
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Authentication successful
      res.json({ message: 'Login successful', user: { user_id: user.user_id, username: user.username, email: user.email } });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
