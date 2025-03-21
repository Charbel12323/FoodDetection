const ingredientController = require("../../controllers/ingredientController");
const pool = require("../../config/db");

jest.mock("../../config/db", () => {
  const mClient = {
    query: jest.fn(),
    release: jest.fn(),
  };
  return {
    connect: jest.fn(() => mClient),
    query: jest.fn(),
  };
});

describe("Ingredient Controller", () => {
  let res;
  let client;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    client = {
      query: jest.fn(),
      release: jest.fn(),
    };

    // Mock pool.connect to return our fake client
    pool.connect.mockResolvedValue(client);
    jest.clearAllMocks();
  });

  // =============================================
  // addIngredients
  // =============================================
  describe("addIngredients", () => {
    it("should add ingredients successfully", async () => {
      const req = {
        body: { userId: 1, ingredients: ["apple", "banana"] },
      };

      // Pretend DB calls succeed
      client.query.mockResolvedValueOnce() // DELETE
        .mockResolvedValueOnce() // INSERT apple
        .mockResolvedValueOnce(); // INSERT banana

      await ingredientController.addIngredients(req, res);

      expect(pool.connect).toHaveBeenCalled();
      expect(client.query).toHaveBeenCalledWith("BEGIN");
      expect(client.query).toHaveBeenCalledWith(
        "DELETE FROM user_ingredients WHERE user_id = $1",
        [1]
      );
      expect(client.query).toHaveBeenCalledWith(
        "INSERT INTO user_ingredients (user_id, ingredient) VALUES ($1, $2)",
        [1, "apple"]
      );
      expect(client.query).toHaveBeenCalledWith(
        "INSERT INTO user_ingredients (user_id, ingredient) VALUES ($1, $2)",
        [1, "banana"]
      );
      expect(client.query).toHaveBeenCalledWith("COMMIT");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Ingredients updated successfully" });
      expect(client.release).toHaveBeenCalled();
    });

    it("should return 400 if userId/ingredients invalid (both missing)", async () => {
      const req = { body: {} };

      await ingredientController.addIngredients(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid data provided." });
      expect(client.release).toHaveBeenCalled();
    });

    it("should return 400 if userId is missing but ingredients is valid", async () => {
      const req = {
        body: { ingredients: ["apple"] },
      };

      await ingredientController.addIngredients(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid data provided." });
      expect(client.release).toHaveBeenCalled();
    });

    it("should return 400 if userId is valid but ingredients not an array", async () => {
      const req = {
        body: { userId: 1, ingredients: "notArray" },
      };

      await ingredientController.addIngredients(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid data provided." });
      expect(client.release).toHaveBeenCalled();
    });

    it("should rollback and return 500 on DB error", async () => {
      const req = {
        body: { userId: 1, ingredients: ["apple"] },
      };

      // Force DB error on insert
      client.query
        .mockResolvedValueOnce() // DELETE success
        .mockRejectedValueOnce(new Error("DB Error"));

      await ingredientController.addIngredients(req, res);

      expect(client.query).toHaveBeenCalledWith("ROLLBACK");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
      expect(client.release).toHaveBeenCalled();
    });
  });

  // =============================================
  // getIngredients
  // =============================================
  describe("getIngredients", () => {
    it("should return ingredients successfully", async () => {
      const req = {
        query: { userId: 1 }, // If your code uses req.query
      };

      pool.query.mockResolvedValueOnce({
        rows: [{ ingredient: "apple" }, { ingredient: "banana" }],
      });

      await ingredientController.getIngredients(req, res);

      // NOTE: The real code uses $1::int 
      // Adjust test to match EXACT query from your code
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT ingredient FROM user_ingredients WHERE user_id = $1::int",
        [1]
      );
      expect(res.json).toHaveBeenCalledWith({
        ingredients: ["apple", "banana"],
      });
    });

    it("should return 400 if userId is missing", async () => {
      const req = {
        query: {}, // no userId
      };

      await ingredientController.getIngredients(req, res);

      // The real code might do -> res.status(400).json({ error: 'Missing userId.' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing userId." });
    });

    it("should return 500 on DB error", async () => {
      const req = {
        query: { userId: 1 },
      };

      pool.query.mockRejectedValueOnce(new Error("DB Error"));

      await ingredientController.getIngredients(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  // =============================================
  // deleteIngredient
  // =============================================
  describe("deleteIngredient", () => {
    it("should delete ingredient successfully", async () => {
      const req = {
        body: { userId: 1, ingredient: "salt" },
      };

      pool.query.mockResolvedValueOnce();

      await ingredientController.deleteIngredient(req, res);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM user_ingredients WHERE user_id = $1 AND ingredient = $2",
        [1, "salt"]
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Ingredient deleted successfully" });
    });

    it("should return 400 if userId or ingredient is missing", async () => {
      const req = {
        body: { userId: 1 }, // missing ingredient
      };

      await ingredientController.deleteIngredient(req, res);

      // The real code says -> res.status(400).json({ error: 'Invalid data provided.' });
      // or maybe -> res.status(400).json({ error: 'Missing userId or ingredient' });
      // Adjust based on your deployed code EXACTLY

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid data provided." });
    });

    it("should return 500 on DB error", async () => {
      const req = {
        body: { userId: 1, ingredient: "salt" },
      };

      pool.query.mockRejectedValueOnce(new Error("DB Error"));

      await ingredientController.deleteIngredient(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
