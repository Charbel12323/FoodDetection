const authController = require('../../controllers/authController');
const pool = require('../../config/db');
const bcrypt = require('bcrypt');

jest.mock('../../config/db');
jest.mock('bcrypt');

describe('Auth Controller - signup', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should signup a user successfully', async () => {
    // Mock user does not exist
    pool.query.mockResolvedValueOnce({ rows: [] });
    // Mock password hash
    bcrypt.hash.mockResolvedValueOnce('hashedPassword123');
    // Mock successful user insert
    pool.query.mockResolvedValueOnce({
      rows: [{
        user_id: 1,
        username: 'testuser',
        email: 'test@example.com'
      }]
    });

    await authController.signup(req, res);

    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user_id: 1,
      username: 'testuser',
      email: 'test@example.com'
    });
  });

  it('should return 400 if user already exists', async () => {
    // Mock user exists
    pool.query.mockResolvedValueOnce({ rows: [{ email: 'test@example.com' }] });

    await authController.signup(req, res);

    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
  });

  it('should return 500 on unexpected error', async () => {
    pool.query.mockRejectedValueOnce(new Error('DB Error'));

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('Auth Controller - login', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

    await authController.login(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE email = $1',
      [req.body.email]
    );
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login successful',
      user: {
        user_id: 1,
        username: 'testuser',
        email: 'test@example.com'
      }
    });
  });

  it('should return 400 if email not found', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });

  it('should return 400 if password is invalid', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{
        user_id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password_hash: 'hashedPassword123'
      }]
    });
    bcrypt.compare.mockResolvedValueOnce(false);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });

  it('should return 500 on unexpected error', async () => {
    pool.query.mockRejectedValueOnce(new Error('DB Error'));

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
