const express = require('express');
const { addIngredients, getIngredients } = require('../controllers/ingredientController');

const router = express.Router();

router.post('/addIngredients', addIngredients);
router.get('/getIngredients', getIngredients);

module.exports = router;
