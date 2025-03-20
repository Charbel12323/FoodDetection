export interface Recipe {
    recipe_id?: number; // Optional if you're getting it from the backend after save
    user_id?: number; // Optional unless explicitly required in the frontend
    name: string;
    cookingTime: string; // e.g. '30 minutes'
    difficulty: 'Easy' | 'Medium' | 'Hard';
    servings: number;
    nutrition: {
      calories: number;
      protein: string; // e.g. '20g'
      carbs: string;   // e.g. '30g'
      fat: string;     // e.g. '10g'
    };
    ingredients: string[]; // List of ingredients (could be "2 cups flour", etc.)
    instructions: string | string[]; // Sometimes you have an array, sometimes just a long string
    image?: string; // Optional, for recipe images
    created_at?: string; // Optional, for when it was added (ISO string)
    updated_at?: string; // Optional, for when it was last updated (ISO string)
  }
  