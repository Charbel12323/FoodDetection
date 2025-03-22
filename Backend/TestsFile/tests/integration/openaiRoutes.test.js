/**
 * tests/integration/openaiRoutes.test.js
 */

// 1) Define the mock function in a higher scope, so we can reference it inside `jest.mock`.
const mockCreate = jest.fn();

// 2) Mock the 'openai' module BEFORE importing your routes/controller
jest.mock('openai', () => {
  // Return a mocked OpenAI class
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  }));
});

// 3) Now import your testing libraries and route AFTER the mock is set
const request = require('supertest');
const express = require('express');

// This route pulls in openaiController, which pulls in 'openai'
const openaiRoutes = require('../../routes/openaiRoutes');

// Build your express app
const app = express();
app.use(express.json());
app.use('/', openaiRoutes);

describe('OpenAI Routes Integration Tests', () => {
  // Clear mocks between tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /upload-base64', () => {
    it('should return 400 if photo is missing', async () => {
      const res = await request(app)
        .post('/upload-base64')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'No photo provided.' });
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it('should return 200 and extracted ingredients on success', async () => {
      const mockOpenAIResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                ingredients: ['apple', 'banana'],
              }),
            },
          },
        ],
      };

      // Mock a successful call
      mockCreate.mockResolvedValue(mockOpenAIResponse);

      const res = await request(app)
        .post('/upload-base64')
        .send({ photo: 'fakeBase64ImageData' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockOpenAIResponse.choices[0]);
      expect(mockCreate).toHaveBeenCalledTimes(1);

      // Optional: check the call arguments
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gpt-4o',
          messages: expect.any(Array),
          response_format: { type: 'json_object' },
          store: true,
        }),
      );
    });

    it('should return 500 if OpenAI service call fails', async () => {
      // Mock a failing call
      mockCreate.mockRejectedValue(new Error('OpenAI API Failure'));

      const res = await request(app)
        .post('/upload-base64')
        .send({ photo: 'fakeBase64ImageData' });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Something went wrong' });
      expect(mockCreate).toHaveBeenCalledTimes(1);
    });
  });
});
