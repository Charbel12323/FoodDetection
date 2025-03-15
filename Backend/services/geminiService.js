const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-1.5-flash";

/**
 * generateRecipes
 * Uses @google/generative-ai to generate recipes from a list of ingredients.
 * If GEMINI_API_KEY is not present, returns a mock response.
 *
 * @param {string[]} ingredients - An array of ingredients from the user.
 * @returns {Promise<Object>} - JSON object containing recipe suggestions.
 */
async function generateRecipes(ingredients) {
  // 1. Check for API key
  if (!GEMINI_API_KEY) {
    console.warn("No GEMINI_API_KEY found. Returning mock recipes for testing.");
    return {
      recipes: [
        {
          name: "Mock Recipe 1",
          ingredients: ["flour", "sugar", "butter"],
          instructions: "Step 1: Preheat the oven to 350°F (175°C). Step 2: In a large bowl, mix 2 cups of flour, 1 cup of sugar, and 1/2 cup of softened butter until well combined (about 3-4 minutes). Step 3: Transfer to a baking pan and bake for 25-30 minutes until golden brown."
        },
        {
          name: "Mock Recipe 2",
          ingredients: ["pasta", "tomato sauce", "cheese"],
          instructions: "Step 1: Bring a large pot of water to a rolling boil over high heat (this takes about 8-10 minutes). Add 1 tablespoon of salt. Step 2: Add 8oz of pasta and cook for 8-10 minutes until al dente, stirring occasionally. Step 3: Drain pasta in a colander. Step 4: Return pasta to the pot over medium-low heat and add 1 cup of tomato sauce. Stir for 2-3 minutes until heated through. Step 5: Sprinkle 1/2 cup of grated cheese on top and serve immediately."
        }
      ]
    };
  }

  // 2. Create a new GenerativeAI client
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  // 3. Select the model (e.g. "gemini-1.5-flash")
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    temperature: 0.7,  // optional for creative variety
    top_p: 0.95        // optional for nucleus sampling
  });

  // 4. Build a strong prompt for STRICT JSON output with detailed instructions
  const prompt = `
  You are an AI chef creating recipes for beginners. You MUST return valid JSON with NO additional text.
  Do not include markdown fences, code blocks, or explanations.
  
  Given these ingredients: ${ingredients.join(', ')}, create 5 recipes. 
  For each recipe, provide the following fields:
  
  1. "name": string  
  2. "cookingTime": string (e.g., "45 minutes")  
  3. "difficulty": string (one of: "Easy", "Medium", "Hard")  
  4. "servings": number (how many people it serves)  
  5. "nutrition": object with keys:  
     - "calories": number (per serving)  
     - "protein": string (e.g., "20g")  
     - "carbs": string (e.g., "30g")  
     - "fat": string (e.g., "10g")  
  6. "ingredients": array of strings with quantities  
  7. "instructions": string with VERY DETAILED, beginner-friendly steps that include:  
     - Precise measurements for all ingredients  
     - Exact cooking temperatures (Fahrenheit and Celsius)  
     - Specific cooking times  
     - Detailed descriptions of techniques  
     - Visual cues for doneness  
     - Heat levels (e.g., "over medium-high heat")
  
  The ONLY valid output is a JSON object of this form:
  {
    "recipes": [
      {
        "name": "Example Dish",
        "cookingTime": "45 minutes",
        "difficulty": "Medium",
        "servings": 4,
        "nutrition": {
          "calories": 350,
          "protein": "25g",
          "carbs": "15g",
          "fat": "10g"
        },
        "ingredients": ["1 lb chicken breast", "2 tbsp olive oil"],
        "instructions": "Step 1: Preheat the oven to 375°F (190°C)..."
      }
    ]
  }
  No extra keys or text.
  `;

  try {
    // 5. Send the request to Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    // The text is available directly from response.text()
    const text = response.text();
    
    console.log("Gemini raw response:", text); // Log raw for debugging

    // 6. Attempt to clean up the text (remove code blocks or extra lines)
    let cleanedText = text.trim();

    // Remove any code fences like ```something```
    cleanedText = cleanedText.replace(/```[\s\S]*?```/g, '');
    
    // If there are code blocks with json syntax highlighting, extract just the JSON
    const jsonMatch = cleanedText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      cleanedText = jsonMatch[1].trim();
    }

    // Remove possible arrow function wrappers or lines like "() => { ... }"
    // We'll remove anything up to the first '{' and after the last '}'
    const firstBrace = cleanedText.indexOf('{');
    const lastBrace = cleanedText.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanedText = cleanedText.substring(firstBrace, lastBrace + 1).trim();
    }

    // 7. Try to parse JSON
    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.error("Cleaned text was:", cleanedText);
      
      // For debugging - try some common patterns that might be causing issues
      try {
        // Sometimes the response has properly formatted JSON inside a code block
        const codeBlockMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
        if (codeBlockMatch && codeBlockMatch[1]) {
          data = JSON.parse(codeBlockMatch[1].trim());
          console.log("Successfully parsed JSON from code block");
        } else {
          throw new Error("No valid JSON found in code blocks");
        }
      } catch (secondAttemptError) {
        console.error("Second parsing attempt failed:", secondAttemptError);
        
        // Return a structured error response
        data = {
          error: "Gemini provided an unparseable response.",
          raw: text.substring(0, 1000) // Limit the raw text for logging
        };
      }
    }

    return data;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate recipes.");
  }
}

module.exports = { generateRecipes };