// backend/tests/unit/geminiController.test.js

const geminiController = require('../../controllers/geminiController');
const geminiService = require('../../services/geminiService');

jest.mock('../../services/geminiService');

describe('Gemini Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe('getRecipes', () => {
    it('should return 400 if ingredients are missing or not an array', async () => {
      req.body = { ingredients: null };

      await geminiController.getRecipes(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid input: 'ingredients' must be a non-empty array.",
      });
    });

    it('should return 400 if ingredients is an empty array', async () => {
      req.body = { ingredients: [] };

      await geminiController.getRecipes(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid input: 'ingredients' must be a non-empty array.",
      });
    });

    it('should call generateRecipes service and return 200 with data', async () => {
      const ingredients = ['chicken', 'rice'];
      const mockData = { recipes: ['Recipe 1', 'Recipe 2'] };

      req.body = { ingredients };
      geminiService.generateRecipes.mockResolvedValue(mockData);

      await geminiController.getRecipes(req, res);

      expect(geminiService.generateRecipes).toHaveBeenCalledWith(ingredients);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should return 500 if generateRecipes throws an error', async () => {
      const ingredients = ['chicken', 'rice'];
      req.body = { ingredients };

      geminiService.generateRecipes.mockRejectedValue(new Error('Service error'));

      await geminiController.getRecipes(req, res);

      expect(geminiService.generateRecipes).toHaveBeenCalledWith(ingredients);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to generate recipes',
      });
    });
  });
});
