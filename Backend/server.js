require('dotenv').config();
const express = require('express');
const pool = require('./db'); // Your existing database connection, if needed
const bcrypt = require('bcrypt');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Increase JSON body size limit if needed (for large base64 images)
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// --- User Endpoints ---

// User sign-up endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user
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

// POST endpoint to update ingredients for a user
app.post('/api/ingredients', async (req, res) => {
  try {
    const { userId, ingredients } = req.body;
    if (!userId || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Invalid data provided.' });
    }

    // Insert each approved ingredient
    const insertPromises = ingredients.map(ingredient =>
      pool.query('INSERT INTO user_ingredients (user_id, ingredient) VALUES ($1, $2)', [userId, ingredient])
    );
    await Promise.all(insertPromises);

    res.status(200).json({ message: "Ingredients updated successfully" });
  } catch (error) {
    console.error("Error updating ingredients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET endpoint to retrieve ingredients for a user
app.get('/api/ingredients', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId.' });
    }
    const result = await pool.query(
      'SELECT ingredient FROM user_ingredients WHERE user_id = $1::int',
      [userId]
    );
    
    const ingredients = result.rows.map(row => row.ingredient);
    res.json({ ingredients });
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// User log-in endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', user: { user_id: user.user_id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- OpenAI Endpoint ---

// Initialize the OpenAI client with your API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Endpoint to handle Base64 image uploads
// Endpoint to handle Base64 image uploads
app.post('/upload-base64', async (req, res) => {
  try {
    const { photo } = req.body;
    if (!photo) {
      return res.status(400).json({ error: 'No photo provided.' });
    }

    // Construct a data URL for the Base64-encoded image.
    const dataUrl = `data:image/jpeg;base64,${photo}`;

    // Create a chat completion request with an updated prompt.
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Use the appropriate model supporting images
      messages: [
        {
          role: "system",
          content: "You are a specialized food ingredient analyzer. Your only task is to identify ingredients in food images and return them as a clean, structured JSON array. Never include explanations, preambles, or comments in your response."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "List all food ingredients visible in this image. Return ONLY a valid JSON object in this exact format: {\"ingredients\": [\"ingredient 1\", \"ingredient 2\", etc.]}. Include nothing else in your response."
            },
            { type: "image_url", image_url: { url: dataUrl } }
          ]
        }
      ],
      response_format: { type: "json_object" }, // This enforces JSON output
      store: true,
    });

    res.json(response.choices[0]);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
