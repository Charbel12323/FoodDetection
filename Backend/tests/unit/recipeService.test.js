const recipeService = require('../../services/recipeService');

// Mock the pool and client
const mockQuery = jest.fn();
const mockRelease = jest.fn();

jest.mock('../../config/db', () => ({
  connect: jest.fn(() => ({
    query: mockQuery,
    release: mockRelease
  })),
}));

const pool = require('../../config/db');

describe('recipeService', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addRecipe', () => {

    const recipeData = {
      user_id: 'user123',
      name: 'Pasta',
      cookingTime: 30,
      difficulty: 'Easy',
      servings: 2,
      nutrition: { calories: 500 },
      instructions: 'Boil water, add pasta...',
      ingredients: ['Pasta', 'Tomato Sauce']
    };

    it('should successfully add a recipe and return the recipe data with id', async () => {

      mockQuery
        .mockResolvedValueOnce({})                                      // BEGIN
        .mockResolvedValueOnce({ rows: [{ recipe_id: 'recipe123' }] })  // INSERT INTO recipes RETURNING recipe_id
        .mockResolvedValueOnce({})                                      // INSERT INTO recipe_ingredients (Pasta)
        .mockResolvedValueOnce({})                                      // INSERT INTO recipe_ingredients (Tomato Sauce)
        .mockResolvedValueOnce({});                                     // COMMIT

      const result = await recipeService.addRecipe(recipeData);

      expect(pool.connect).toHaveBeenCalled();
      expect(mockQuery).toHaveBeenNthCalledWith(1, 'BEGIN');
      expect(mockQuery).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('INSERT INTO recipes'),
        expect.any(Array)
      );
      expect(mockQuery).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining('INSERT INTO recipe_ingredients'),
        ['recipe123', 'Pasta']
      );
      expect(mockQuery).toHaveBeenNthCalledWith(
        4,
        expect.stringContaining('INSERT INTO recipe_ingredients'),
        ['recipe123', 'Tomato Sauce']
      );
      expect(mockQuery).toHaveBeenNthCalledWith(5, 'COMMIT');
      expect(mockRelease).toHaveBeenCalled();

      expect(result).toEqual({ recipe_id: 'recipe123', ...recipeData });
    });

    it('should rollback and throw an error when ingredient insert fails', async () => {

      mockQuery
        .mockResolvedValueOnce({})                                      // BEGIN
        .mockResolvedValueOnce({ rows: [{ recipe_id: 'recipe123' }] })  // INSERT INTO recipes RETURNING recipe_id
        .mockRejectedValueOnce(new Error('Insert ingredient failed'));  // INSERT INTO recipe_ingredients (Pasta)

      await expect(recipeService.addRecipe(recipeData)).rejects.toThrow('Insert ingredient failed');

      expect(pool.connect).toHaveBeenCalled();
      expect(mockQuery).toHaveBeenNthCalledWith(1, 'BEGIN');
      expect(mockQuery).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('INSERT INTO recipes'),
        expect.any(Array)
      );
      expect(mockQuery).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining('INSERT INTO recipe_ingredients'),
        ['recipe123', 'Pasta']
      );
      expect(mockQuery).toHaveBeenCalledWith('ROLLBACK');
      expect(mockRelease).toHaveBeenCalled();
    });

  });

  describe('getRecipes', () => {

    const user_id = 'user123';

    it('should fetch recipes successfully', async () => {

      const mockRows = [
        {
          recipe_id: 'recipe1',
          user_id: 'user123',
          name: 'Pasta',
          ingredients: ['Pasta', 'Tomato Sauce']
        },
        {
          recipe_id: 'recipe2',
          user_id: 'user123',
          name: 'Salad',
          ingredients: ['Lettuce', 'Tomato']
        }
      ];

      mockQuery
        .mockResolvedValueOnce({ rows: mockRows }); // SELECT query returns rows

      const result = await recipeService.getRecipes(user_id);

      expect(pool.connect).toHaveBeenCalled();
      expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('SELECT r.*'), [user_id]);
      expect(mockRelease).toHaveBeenCalled();
      expect(result).toEqual(mockRows);
    });

    it('should throw an error if query fails', async () => {

      mockQuery
        .mockRejectedValueOnce(new Error('Database error'));

      await expect(recipeService.getRecipes(user_id)).rejects.toThrow('Database error');

      expect(pool.connect).toHaveBeenCalled();
      expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('SELECT r.*'), [user_id]);
      expect(mockRelease).toHaveBeenCalled();
    });

  });

});
