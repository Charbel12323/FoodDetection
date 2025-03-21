const request = require('supertest');
const express = require('express');
const geminiRoutes = require('../../routes/geminiRoutes');
const geminiService = require('../../services/geminiService');

// Mock the geminiService.generateRecipes function
jest.mock('../../services/geminiService');

const app = express();
app.use(express.json()); // Parse JSON body
app.use('/api', geminiRoutes);

describe('Gemini Routes Integration Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/generate-recipes', () => {

    it('should return 400 if ingredients are missing', async () => {
      const res = await request(app)
        .post('/api/generate-recipes')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: "Invalid input: 'ingredients' must be a non-empty array."
      });
      expect(geminiService.generateRecipes).not.toHaveBeenCalled();
    });

    it('should return 400 if ingredients is not an array', async () => {
      const res = await request(app)
        .post('/api/generate-recipes')
        .send({ ingredients: 'not-an-array' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: "Invalid input: 'ingredients' must be a non-empty array."
      });
      expect(geminiService.generateRecipes).not.toHaveBeenCalled();
    });

    it('should return 400 if ingredients array is empty', async () => {
      const res = await request(app)
        .post('/api/generate-recipes')
        .send({ ingredients: [] });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: "Invalid input: 'ingredients' must be a non-empty array."
      });
      expect(geminiService.generateRecipes).not.toHaveBeenCalled();
    });

    it('should return 200 and recipe data on success', async () => {
      const mockRecipes = {
        recipes: [
          {
            name: 'Test Recipe',
            ingredients: ['ingredient1', 'ingredient2'],
            instructions: 'Step 1: Do something.',
            image: 'http://example.com/image.jpg'
          }
        ]
      };

      geminiService.generateRecipes.mockResolvedValue(mockRecipes);

      const res = await request(app)
        .post('/api/generate-recipes')
        .send({
          ingredients: ['chicken', 'rice']
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockRecipes);
      expect(geminiService.generateRecipes).toHaveBeenCalledWith(['chicken', 'rice']);
      expect(geminiService.generateRecipes).toHaveBeenCalledTimes(1);
    });

    it('should return 500 if the service throws an error', async () => {
      geminiService.generateRecipes.mockRejectedValue(new Error('Service failed'));

      const res = await request(app)
        .post('/api/generate-recipes')
        .send({
          ingredients: ['chicken', 'rice']
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to generate recipes' });
      expect(geminiService.generateRecipes).toHaveBeenCalledWith(['chicken', 'rice']);
      expect(geminiService.generateRecipes).toHaveBeenCalledTimes(1);
    });

  });

});
