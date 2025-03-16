const pool = require('../config/db');

exports.addIngredients = async (req, res) => {
  try {
    const { userId, ingredients } = req.body;

    if (!userId || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Invalid data provided.' });
    }

    const insertPromises = ingredients.map(ingredient =>
      pool.query('INSERT INTO user_ingredients (user_id, ingredient) VALUES ($1, $2)', [userId, ingredient])
    );
    await Promise.all(insertPromises);

    res.status(200).json({ message: "Ingredients updated successfully" });
  } catch (error) {
    console.error("Error updating ingredients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getIngredients = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) return res.status(400).json({ error: 'Missing userId.' });

    const result = await pool.query('SELECT ingredient FROM user_ingredients WHERE user_id = $1::int', [userId]);
    res.json({ ingredients: result.rows.map(row => row.ingredient) });
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a single ingredient from the user's inventory
exports.deleteIngredient = async (req, res) => {
  try {
    const { userId, ingredient } = req.body;
    if (!userId || !ingredient) {
      return res.status(400).json({ error: 'Invalid data provided.' });
    }
    await pool.query(
      'DELETE FROM user_ingredients WHERE user_id = $1 AND ingredient = $2',
      [userId, ingredient]
    );
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

