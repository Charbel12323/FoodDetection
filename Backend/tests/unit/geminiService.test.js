// Import the service module (not the function directly)
const geminiService = require('../../services/geminiService');
const spoonacularService = require('../../services/spoonacularService');

// Mock dependencies
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockImplementation(() => {
          return {
            generateContent: jest.fn().mockImplementation(async (prompt) => {
              return mockGenerateContent();
            }),
          };
        }),
      };
    }),
  };
});

// Mock spoonacular service
jest.mock('../../services/spoonacularService', () => {
  return {
    fetchRecipeImage: jest.fn().mockResolvedValue('https://example.com/mock-image.jpg'),
  };
});

// Global mock function to be customized in each test
let mockGenerateContent;

describe('Gemini Service (NO API KEY)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GEMINI_API_KEY = '';
    jest.resetModules();
  });

  it('returns mock recipes if GEMINI_API_KEY is missing', async () => {
    const result = await geminiService.generateRecipes(['flour', 'sugar']);

    expect(result).toBeDefined();
    expect(result.recipes).toHaveLength(2);
    expect(result.recipes[0].name).toBe('Mock Recipe 1');
    expect(result.recipes[1].name).toBe('Mock Recipe 2');
  });
});

describe('Gemini Service (WITH API KEY)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-api-key';
    jest.resetModules();
  });

  afterAll(() => {
    process.env.GEMINI_API_KEY = '';
  });

  it('returns valid recipes with images when Gemini API works', async () => {
    const validJsonResponse = {
      recipes: [
        {
          name: 'Pasta Carbonara',
          cookingTime: '30 minutes',
          difficulty: 'Medium',
          servings: 4,
          nutrition: {
            calories: 450,
            protein: '20g',
            carbs: '50g',
            fat: '15g',
          },
          ingredients: ['200g spaghetti', '100g pancetta', '2 large eggs'],
          instructions: 'Step 1: Boil water...',
        },
      ],
    };

    mockGenerateContent = jest.fn().mockResolvedValue({
      response: {
        text: () => JSON.stringify(validJsonResponse),
      },
    });

    const result = await geminiService.generateRecipes(['pasta', 'eggs', 'cheese']);

    expect(result).toBeDefined();
    expect(result.recipes).toHaveLength(1);
    expect(result.recipes[0].name).toBe('Pasta Carbonara');
    expect(result.recipes[0].image).toBe('https://example.com/mock-image.jpg');
  });

  it('returns structured error if Gemini returns invalid JSON', async () => {
    mockGenerateContent = jest.fn().mockResolvedValue({
      response: {
        text: () => 'This is not valid JSON',
      },
    });

    const result = await geminiService.generateRecipes(['flour', 'sugar']);

    expect(result).toBeDefined();
    expect(result.error).toBeDefined();
    expect(result.error).toContain('unparseable');
  });

  it('handles JSON inside code blocks', async () => {
    const validJsonWithinCodeBlock = '```json\n{"recipes":[{"name":"Chocolate Cake"}]}\n```';

    mockGenerateContent = jest.fn().mockResolvedValue({
      response: {
        text: () => validJsonWithinCodeBlock,
      },
    });

    const result = await geminiService.generateRecipes(['chocolate', 'flour']);

    expect(result).toBeDefined();
    expect(result.recipes).toHaveLength(1);
    expect(result.recipes[0].name).toBe('Chocolate Cake');
  });

  it('throws an error if Gemini API call fails completely', async () => {
    mockGenerateContent = jest.fn().mockRejectedValue(new Error('API failure'));

    await expect(geminiService.generateRecipes(['flour', 'sugar'])).rejects.toThrow('Failed to generate recipes');
  });

  it('handles other JSON parsing edge cases', async () => {
    const wrappedJson = '() => {\n{"recipes":[{"name":"Brownie"}]}\n}';

    mockGenerateContent = jest.fn().mockResolvedValue({
      response: {
        text: () => wrappedJson,
      },
    });

    const result = await geminiService.generateRecipes(['chocolate', 'nuts']);

    expect(result).toBeDefined();
    expect(result.error).toBeDefined();
  });
});

// NEW TEST CASES (Function Coverage, Edge Cases, etc.)
describe('Gemini Service (Function Coverage)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-api-key';
    jest.resetModules();
  });

  it('tests the getApiKey and setApiKey functions', () => {
    const { getApiKey, setApiKey } = require('../../services/geminiService');

    expect(getApiKey()).toBe('test-api-key');

    setApiKey('new-test-key');
    expect(getApiKey()).toBe('new-test-key');

    // Reset key to avoid affecting other tests
    setApiKey('test-api-key');
  });

  it('tests model name configuration', async () => {
    const originalModelName = process.env.GEMINI_MODEL;
    process.env.GEMINI_MODEL = 'custom-model-name';

    jest.resetModules();
    const geminiService = require('../../services/geminiService');

    const validJsonResponse = {
      recipes: [{ name: 'Test Recipe' }],
    };

    mockGenerateContent = jest.fn().mockResolvedValue({
      response: {
        text: () => JSON.stringify(validJsonResponse),
      },
    });

    const { GoogleGenerativeAI } = require('@google/generative-ai');

    // Trigger the call to generateRecipes
    await geminiService.generateRecipes(['test']);

    // Get the instance of the mocked GoogleGenerativeAI constructor
    const genAIInstance = GoogleGenerativeAI.mock.results[0].value;

    // Check the getGenerativeModel call arguments
    const getGenerativeModelCalls = genAIInstance.getGenerativeModel.mock.calls;

    expect(getGenerativeModelCalls.length).toBeGreaterThan(0);
    expect(getGenerativeModelCalls[0][0].model).toBe('custom-model-name');

    process.env.GEMINI_MODEL = originalModelName;
  });

  it('tests more edge cases for JSON extraction', async () => {
    const codeBlockNoLanguage = '```\n{"recipes":[{"name":"Simple Dish"}]}\n```';

    mockGenerateContent = jest.fn().mockResolvedValue({
      response: {
        text: () => codeBlockNoLanguage,
      },
    });

    const result = await geminiService.generateRecipes(['ingredient']);

    expect(result).toBeDefined();
    expect(result.recipes).toHaveLength(1);
    expect(result.recipes[0].name).toBe('Simple Dish');
  });

  it('handles image fetching errors', async () => {
    jest.resetModules();
    jest.doMock('../../services/spoonacularService', () => {
      return {
        fetchRecipeImage: jest.fn().mockResolvedValue(null),
      };
    });

    const geminiService = require('../../services/geminiService');

    const validJsonResponse = {
      recipes: [
        {
          name: 'Test Recipe With Null Image',
          ingredients: ['test ingredient'],
        },
      ],
    };

    mockGenerateContent = jest.fn().mockResolvedValue({
      response: {
        text: () => JSON.stringify(validJsonResponse),
      },
    });

    const result = await geminiService.generateRecipes(['test']);

    expect(result).toBeDefined();
    expect(result.recipes).toHaveLength(1);
    expect(result.recipes[0].image).toBeNull();
  });
});
