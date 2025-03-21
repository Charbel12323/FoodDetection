const recipeController = require('../../controllers/recipeController');
const recipeService = require('../../services/recipeService');

// Mock the response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('../../services/recipeService');

describe('recipeController', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addRecipe', () => {

    it('should add a recipe successfully and return 201', async () => {
      const req = {
        body: {
          user_id: 'user123',
          name: 'Pasta',
          cookingTime: 30,
          difficulty: 'Easy',
          servings: 2,
          nutrition: { calories: 500 },
          instructions: 'Boil water, add pasta...',
          ingredients: [{ name: 'Pasta', quantity: '200g' }]
        }
      };

      const savedRecipe = { id: 'recipe123', ...req.body };

      recipeService.addRecipe.mockResolvedValue(savedRecipe);

      const res = mockResponse();

      await recipeController.addRecipe(req, res);

      expect(recipeService.addRecipe).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedRecipe);
    });

    it('should return 400 if required fields are missing (user_id)', async () => {
      const req = {
        body: {
          // user_id is missing
          name: 'Pasta',
          ingredients: [{ name: 'Pasta', quantity: '200g' }]
        }
      };

      const res = mockResponse();

      await recipeController.addRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid recipe data' });
      expect(recipeService.addRecipe).not.toHaveBeenCalled();
    });

    it('should return 400 if ingredients are not provided or empty', async () => {
      const req = {
        body: {
          user_id: 'user123',
          name: 'Pasta',
          ingredients: [] // empty array triggers validation fail
        }
      };

      const res = mockResponse();

      await recipeController.addRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid recipe data' });
      expect(recipeService.addRecipe).not.toHaveBeenCalled();
    });

    it('should handle errors and return 500', async () => {
      const req = {
        body: {
          user_id: 'user123',
          name: 'Pasta',
          cookingTime: 30,
          difficulty: 'Easy',
          servings: 2,
          nutrition: { calories: 500 },
          instructions: 'Boil water, add pasta...',
          ingredients: [{ name: 'Pasta', quantity: '200g' }]
        }
      };

      recipeService.addRecipe.mockRejectedValue(new Error('DB error'));

      const res = mockResponse();

      await recipeController.addRecipe(req, res);

      expect(recipeService.addRecipe).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to add recipe' });
    });

  });

  describe('getRecipes', () => {

    it('should fetch recipes successfully and return 200', async () => {
      const req = {
        query: {
          user_id: 'user123'
        }
      };

      const recipesList = [{ id: 'recipe1' }, { id: 'recipe2' }];
      recipeService.getRecipes.mockResolvedValue(recipesList);

      const res = mockResponse();

      await recipeController.getRecipes(req, res);

      expect(recipeService.getRecipes).toHaveBeenCalledWith('user123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ recipes: recipesList });
    });

    it('should return 400 if user_id is missing in query', async () => {
      const req = {
        query: {}
      };

      const res = mockResponse();

      await recipeController.getRecipes(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing user_id' });
      expect(recipeService.getRecipes).not.toHaveBeenCalled();
    });

    it('should handle errors and return 500', async () => {
      const req = {
        query: {
          user_id: 'user123'
        }
      };

      recipeService.getRecipes.mockRejectedValue(new Error('DB error'));

      const res = mockResponse();

      await recipeController.getRecipes(req, res);

      expect(recipeService.getRecipes).toHaveBeenCalledWith('user123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch recipes' });
    });

  });

});
