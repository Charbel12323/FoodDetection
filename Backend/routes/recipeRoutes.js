// backend/routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.post('/recipes', recipeController.addRecipe);
router.get('/recipes', recipeController.getRecipes);

module.exports = router;
