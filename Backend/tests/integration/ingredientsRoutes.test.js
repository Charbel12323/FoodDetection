const request = require('supertest');
const express = require('express');
const ingredientRoutes = require('../../routes/ingredientRoutes');
const pool = require('../../config/db');

// Mock pool.connect and pool.query
const mockQuery = jest.fn();
const mockRelease = jest.fn();
const mockClient = {
  query: mockQuery,
  release: mockRelease
};

// Mock pool.connect returns the client with query and release
jest.mock('../../config/db', () => ({
  connect: jest.fn(() => mockClient),
  query: jest.fn() // for non-transaction cases like getIngredients and deleteIngredient
}));

const app = express();
app.use(express.json());
app.use('/', ingredientRoutes);

describe('Ingredient Routes Integration Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /addIngredients', () => {

    it('should return 400 if userId or ingredients are missing', async () => {
      const res = await request(app)
        .post('/addIngredients')
        .send({}); // missing userId & ingredients

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid data provided.' });
    });

    it('should return 200 on successful addition of ingredients', async () => {
      mockQuery
        .mockResolvedValueOnce({}) // BEGIN
        .mockResolvedValueOnce({}) // DELETE
        .mockResolvedValueOnce({}) // INSERT for ingredient 1
        .mockResolvedValueOnce({}) // INSERT for ingredient 2
        .mockResolvedValueOnce({}); // COMMIT

      const res = await request(app)
        .post('/addIngredients')
        .send({
          userId: 1,
          ingredients: ['apple', 'banana']
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Ingredients updated successfully' });
      expect(mockQuery).toHaveBeenCalledWith('BEGIN');
      expect(mockQuery).toHaveBeenCalledWith(
        'DELETE FROM user_ingredients WHERE user_id = $1',
        [1]
      );
    });

    it('should return 500 if an error occurs and rollback transaction', async () => {
      mockQuery
        .mockResolvedValueOnce({}) // BEGIN
        .mockRejectedValueOnce(new Error('DB error')); // DELETE fails

      const res = await request(app)
        .post('/addIngredients')
        .send({
          userId: 1,
          ingredients: ['apple']
        });

      expect(res.statusCode).toBe(500);
      expect(mockQuery).toHaveBeenCalledWith('ROLLBACK');
      expect(res.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('GET /getIngredients', () => {

    it('should return 400 if userId is missing', async () => {
      const res = await request(app)
        .get('/getIngredients');

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Missing userId.' });
    });

    it('should return 200 and ingredients on success', async () => {
      const mockIngredients = [{ ingredient: 'apple' }, { ingredient: 'banana' }];
      pool.query.mockResolvedValueOnce({ rows: mockIngredients });

      const res = await request(app)
        .get('/getIngredients')
        .query({ userId: '1' }); // passing userId as a string (as in real usage)

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ ingredients: ['apple', 'banana'] });
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT ingredient FROM user_ingredients WHERE user_id = $1::int',
        ["1"] // expecting string here to match the controller behavior
      );
    });

    it('should return 500 if DB query fails', async () => {
      pool.query.mockRejectedValueOnce(new Error('DB error'));

      const res = await request(app)
        .get('/getIngredients')
        .query({ userId: '1' }); // simulate passing userId as a string

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('POST /deleteIngredient', () => {

    it('should return 400 if userId or ingredient is missing', async () => {
      const res = await request(app)
        .post('/deleteIngredient')
        .send({}); // Missing both fields

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid data provided.' });
    });

    it('should return 200 on successful deletion', async () => {
      pool.query.mockResolvedValueOnce({});

      const res = await request(app)
        .post('/deleteIngredient')
        .send({
          userId: 1,
          ingredient: 'apple'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Ingredient deleted successfully' });
      expect(pool.query).toHaveBeenCalledWith(
        'DELETE FROM user_ingredients WHERE user_id = $1 AND ingredient = $2',
        [1, 'apple']
      );
    });

    it('should return 500 if DB query fails', async () => {
      pool.query.mockRejectedValueOnce(new Error('DB error'));

      const res = await request(app)
        .post('/deleteIngredient')
        .send({
          userId: 1,
          ingredient: 'apple'
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Internal server error' });
    });
  });

});
