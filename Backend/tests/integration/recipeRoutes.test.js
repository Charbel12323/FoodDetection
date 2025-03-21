const request = require('supertest');
const express = require('express');
const recipeRoutes = require('../../routes/recipeRoutes');
const recipeService = require('../../services/recipeService');

// Mock the recipeService methods
jest.mock('../../services/recipeService');

const app = express();
app.use(express.json());
app.use('/', recipeRoutes);

describe('Recipe Routes Integration Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /recipes', () => {

    it('should return 400 if user_id is missing', async () => {
      const res = await request(app)
        .post('/recipes')
        .send({
          name: 'Test Recipe',
          ingredients: ['apple', 'banana']
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid recipe data' });
      expect(recipeService.addRecipe).not.toHaveBeenCalled();
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app)
        .post('/recipes')
        .send({
          user_id: 1,
          ingredients: ['apple', 'banana']
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid recipe data' });
      expect(recipeService.addRecipe).not.toHaveBeenCalled();
    });

    it('should return 400 if ingredients is not a non-empty array', async () => {
      const res = await request(app)
        .post('/recipes')
        .send({
          user_id: 1,
          name: 'Test Recipe',
          ingredients: [] // empty array
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid recipe data' });
      expect(recipeService.addRecipe).not.toHaveBeenCalled();
    });

    it('should return 201 and recipe data on success', async () => {
      const mockRecipe = {
        recipe_id: 1,
        user_id: 1,
        name: 'Test Recipe',
        cookingTime: 30,
        difficulty: 'Easy',
        servings: 2,
        nutrition: { calories: 200 },
        instructions: 'Mix ingredients and cook.',
        ingredients: ['apple', 'banana']
      };

      recipeService.addRecipe.mockResolvedValue(mockRecipe);

      const res = await request(app)
        .post('/recipes')
        .send({
          user_id: 1,
          name: 'Test Recipe',
          cookingTime: 30,
          difficulty: 'Easy',
          servings: 2,
          nutrition: { calories: 200 },
          instructions: 'Mix ingredients and cook.',
          ingredients: ['apple', 'banana']
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockRecipe);
      expect(recipeService.addRecipe).toHaveBeenCalledTimes(1);
    });

    it('should return 500 if service throws an error', async () => {
      recipeService.addRecipe.mockRejectedValue(new Error('Service failed'));

      const res = await request(app)
        .post('/recipes')
        .send({
          user_id: 1,
          name: 'Test Recipe',
          ingredients: ['apple', 'banana']
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to add recipe' });
      expect(recipeService.addRecipe).toHaveBeenCalledTimes(1);
    });

  });

  describe('GET /recipes', () => {

    it('should return 400 if user_id is missing in query', async () => {
      const res = await request(app)
        .get('/recipes');

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Missing user_id' });
      expect(recipeService.getRecipes).not.toHaveBeenCalled();
    });

    it('should return 200 and list of recipes on success', async () => {
      const mockRecipes = [
        {
          recipe_id: 1,
          user_id: 1,
          name: 'Test Recipe',
          ingredients: ['apple', 'banana']
        }
      ];

      recipeService.getRecipes.mockResolvedValue(mockRecipes);

      const res = await request(app)
        .get('/recipes')
        .query({ user_id: 1 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ recipes: mockRecipes });
      expect(recipeService.getRecipes).toHaveBeenCalledWith('1'); // user_id from query string is a string!
      expect(recipeService.getRecipes).toHaveBeenCalledTimes(1);
    });

    it('should return 500 if service throws an error', async () => {
      recipeService.getRecipes.mockRejectedValue(new Error('Service failed'));

      const res = await request(app)
        .get('/recipes')
        .query({ user_id: 1 });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to fetch recipes' });
      expect(recipeService.getRecipes).toHaveBeenCalledWith('1'); // from query
      expect(recipeService.getRecipes).toHaveBeenCalledTimes(1);
    });

  });

});
