const express = require('express');
const { addIngredients, getIngredients, deleteIngredient } = require('../controllers/ingredientController');

const router = express.Router();

router.post('/addIngredients', addIngredients);
router.get('/getIngredients', getIngredients);
router.post('/deleteIngredient', deleteIngredient)
module.exports = router;
