// backend/services/recipeService.js
const pool = require('../config/db');

exports.addRecipe = async (recipeData) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { user_id, name, cookingTime, difficulty, servings, nutrition, instructions, ingredients } = recipeData;

    // Insert into recipes table
    const insertRecipeText = `
      INSERT INTO recipes (user_id, name, cooking_time, difficulty, servings, nutrition, instructions)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING recipe_id
    `;
    const insertRecipeValues = [user_id, name, cookingTime, difficulty, servings, nutrition, instructions];
    const result = await client.query(insertRecipeText, insertRecipeValues);
    const recipe_id = result.rows[0].recipe_id;

    // Insert ingredients into recipe_ingredients table
    for (let ingredient of ingredients) {
      const insertIngredientText = `
        INSERT INTO recipe_ingredients (recipe_id, ingredient)
        VALUES ($1, $2)
      `;
      await client.query(insertIngredientText, [recipe_id, ingredient]);
    }

    await client.query('COMMIT');
    // Return the inserted recipe data (with its new id)
    return { recipe_id, ...recipeData };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

exports.getRecipes = async (user_id) => {
  const client = await pool.connect();
  try {
    // Return recipes for the given user_id including their ingredients as an aggregated JSON array
    const recipesQuery = `
      SELECT r.*, 
        json_agg(ri.ingredient) AS ingredients
      FROM recipes r
      LEFT JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
      WHERE r.user_id = $1
      GROUP BY r.recipe_id
      ORDER BY r.created_at DESC
    `;
    const result = await client.query(recipesQuery, [user_id]);
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
