/**
 * tests/unit/openaiController.test.js
 */

// Mock openai directly in this file
jest.mock('openai', () => {
    return jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    }));
  });
  
  // Declare your mockCreate function at the top of the test file
  const mockCreate = jest.fn();
  
  const OpenAI = require('openai');
  const openaiController = require('../../controllers/openaiController');
  
  describe('OpenAI Controller - analyzeImage', () => {
    let req;
    let res;
  
    beforeEach(() => {
      jest.clearAllMocks();
  
      req = { body: {} };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  
    it('should return 400 if no photo is provided', async () => {
      req.body = {}; // No photo
  
      await openaiController.analyzeImage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'No photo provided.' });
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
  
      mockCreate.mockResolvedValue(mockOpenAIResponse);
  
      req.body = { photo: 'fakeBase64ImageData' };
  
      await openaiController.analyzeImage(req, res);
  
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockCreate).toHaveBeenCalledWith({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Identify food ingredients from an image and return only a structured JSON object.',
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'List all food ingredients visible in this image as a JSON object.' },
              { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,fakeBase64ImageData' } },
            ],
          },
        ],
        response_format: { type: 'json_object' },
        store: true,
      });
  
      expect(res.json).toHaveBeenCalledWith(mockOpenAIResponse.choices[0]);
      expect(res.status).not.toHaveBeenCalledWith(400);
    });
  
    it('should return 500 if OpenAI API call throws an error', async () => {
      mockCreate.mockRejectedValue(new Error('OpenAI API Failure'));
  
      req.body = { photo: 'fakeBase64ImageData' };
  
      await openaiController.analyzeImage(req, res);
  
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Something went wrong' });
    });
  });
  