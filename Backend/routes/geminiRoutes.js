// backend/routes/geminiRoutes.js

const express = require('express');
const { getRecipes } = require('../controllers/geminiController');

const router = express.Router();

// POST /api/generate-recipes
router.post('/generate-recipes', getRecipes);

module.exports = router;
