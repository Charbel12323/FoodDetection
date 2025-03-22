require('dotenv').config();


const request = require('supertest');
const app = require('../../../server');
const pool = require('../../../config/db');
const bcrypt = require('bcrypt');

jest.mock('../../config/db');
jest.mock('bcrypt');

describe('Auth Routes Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/signup', () => {
    it('should signup a user successfully', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [] }) // No existing user
        .mockResolvedValueOnce({
          rows: [{
            user_id: 1,
            username: 'testuser',
            email: 'test@example.com'
          }]
        });

      bcrypt.hash.mockResolvedValueOnce('hashedPassword123');

      const res = await request(app)
        .post('/api/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({
        user_id: 1,
        username: 'testuser',
        email: 'test@example.com'
      });
    });

    it('should return 400 if user already exists', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [{ email: 'test@example.com' }]
      });

      const res = await request(app)
        .post('/api/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
        error: 'User already exists'
      });
    });

    it('should return 500 on DB error', async () => {
      pool.query.mockRejectedValueOnce(new Error('DB Error'));

      const res = await request(app)
        .post('/api/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
        error: 'Internal Server Error'
      });
    });
  });

  describe('POST /api/login', () => {
    it('should login successfully with valid credentials', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [{
          user_id: 1,
          username: 'testuser',
          email: 'test@example.com',
          password_hash: 'hashedPassword123'
        }]
      });

      bcrypt.compare.mockResolvedValueOnce(true);

      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        message: 'Login successful',
        user: {
          user_id: 1,
          username: 'testuser',
          email: 'test@example.com'
        }
      });
    });

    it('should return 400 if user is not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'notfound@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
        error: 'Invalid email or password'
      });
    });

    it('should return 400 if password is incorrect', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [{
          user_id: 1,
          username: 'testuser',
          email: 'test@example.com',
          password_hash: 'hashedPassword123'
        }]
      });

      bcrypt.compare.mockResolvedValueOnce(false);

      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
        error: 'Invalid email or password'
      });
    });

    it('should return 500 on DB error', async () => {
      pool.query.mockRejectedValueOnce(new Error('DB Error'));

      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({
        error: 'Internal Server Error'
      });
    });
  });
});
