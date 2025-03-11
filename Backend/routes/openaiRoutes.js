const express = require('express');
const { analyzeImage } = require('../controllers/openaiController');

const router = express.Router();

router.post('/upload-base64', analyzeImage);

module.exports = router;
