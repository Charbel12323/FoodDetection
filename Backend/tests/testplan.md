# 🧪 Testing Document - Food Detection Project


---

## Test Plan
The purpose of the test plan is to ensure the **Backend API** for the Food Detection system is robust, reliable, and functions as intended.  
We focus on **unit testing**, **integration testing**, and **validation** across:

- Controllers (API endpoints)
- Services (business logic, database queries, external APIs)
- Routes (HTTP interface)

---

## Testing Strategy

### 1. **Unit Testing**
- **Goal:** Ensure each controller/service function works in isolation.
- **Method:** Mock external dependencies (database, LLM APIs).
- **Tools:**  
  - `Jest` for unit testing  
  - `Mocking` for DB/API services

### 2. **Integration Testing**
- **Goal:** Verify routes, controllers, and services work together.
- **Method:** Use `Supertest` to simulate real HTTP requests to routes.
- **Focus:** Database interactions, API calls, HTTP responses.

### 3. **End-to-End Testing** (Optional but recommended)
- **Goal:** Verify system functionality from front-end to back-end (if applicable).
- Not implemented in this version.

---

## Unit Test Coverage

| Controller / Service         | % Statements | % Branch | % Functions | % Lines |
|------------------------------|--------------|----------|-------------|---------|
| **Controllers**              | 100%         | 96.87%   | 100%        | 100%    |
| - authController             | 100%         | 100%     | 100%        | 100%    |
| - geminiController           | 100%         | 100%     | 100%        | 100%    |
| - ingredientController       | 100%         | 91.66%   | 100%        | 100%    |
| - openaiController           | 100%         | 100%     | 100%        | 100%    |
| - recipeController           | 100%         | 100%     | 100%        | 100%    |

| Service                     | % Statements | % Branch | % Functions | % Lines |
|-----------------------------|--------------|----------|-------------|---------|
| geminiService               | 97.95%       | 92.30%   | 100%        | 97.87%  |
| recipeService               | 100%         | 100%     | 100%        | 100%    |


---

## Integration Test Coverage

| Route                | Tests Description                                 | Status  |
|----------------------|---------------------------------------------------|---------|
| `/api/auth`          | Sign up, login, authentication flows              | ✅ PASS |
| `/api/gemini`        | Recipe generation from Gemini LLM                 | ✅ PASS |
| `/api/ingredients`   | Add, get, delete ingredients                      | ✅ PASS |
| `/api/openai`        | Image analysis via OpenAI                         | ✅ PASS |
| `/api/recipes`       | Add and retrieve recipes                          | ✅ PASS |

---

## Test Data Set

### 1. **Test Users**
| Username | Password  |
|----------|-----------|
| testuser | testpass  |

### 2. **Test Ingredients**
| Ingredient Name |
|-----------------|
| Tomato          |
| Cheese          |
| Chicken         |

### 3. **Test Recipe Request (Gemini/OpenAI)**
| Type     | Data                                                          |
|----------|---------------------------------------------------------------|
| Image    | Base64 encoded image of food (for OpenAI)                     |
| Text     | `{"ingredients": ["tomato", "cheese"]}` (for Gemini service)  |

---

## Expected vs Actual Results

| Test Description                                 | Expected Result                        | Actual Result | Status  |
|--------------------------------------------------|---------------------------------------|---------------|---------|
| User signup (valid data)                         | `201 Created` and user object         | `201 Created` | ✅ PASS |
| User login (valid credentials)                   | `200 OK` and JWT token                | `200 OK`     | ✅ PASS |
| Add ingredient                                   | `200 OK` and confirmation message     | `200 OK`     | ✅ PASS |
| Get ingredients (existing user)                  | List of ingredients                   | Matches      | ✅ PASS |
| Delete ingredient (valid ID)                     | `200 OK` and delete confirmation      | `200 OK`     | ✅ PASS |
| Gemini recipe generation (valid request)         | JSON recipe list                      | JSON received | ✅ PASS |
| OpenAI image analysis (valid image)              | JSON with analysis                    | JSON received | ✅ PASS |
| DB failure (mocked)                              | `500 Internal Server Error` returned  | `500` error  | ✅ PASS |
| Invalid recipe generation (missing ingredients)  | `400 Bad Request`                     | `400` error  | ✅ PASS |

---

## Test Results Summary

Command:  
```bash
npm test
```

Output:  
```
Test Suites: 12 passed, 12 total
Tests:       78 passed, 78 total
Snapshots:   0 total
Time:        3.809 s
Ran all test suites.
```

---

## Validation Plan

### 1. Validation Criteria
| Test Type             | Validation Goal                           | Pass Criteria                                        |
|-----------------------|-------------------------------------------|------------------------------------------------------|
| Unit Tests            | Functions behave correctly in isolation   | 100% passing on npm test                             |
| Integration Tests     | Endpoints work with services/DB/API       | 100% endpoint coverage, 200/400/500 responses as expected |
| Error Handling Tests  | Proper HTTP error codes returned          | Return 400/404/500 errors with correct messages      |
| Data Validation       | Inputs validated and sanitized            | Reject invalid/malicious inputs                      |

### 2. Validation Process
- **Unit Tests:** Ensure controller/service logic works independently (mocked DB/API).  
- **Integration Tests:** Simulate full HTTP request/response cycles using Supertest.  
- **Error Handling Tests:** Force DB/API failures to ensure graceful error responses.  

### 3. Test Pass/Fail Reporting
- Tests pass when the actual response matches the expected outcome.  
- Failures trigger debug sessions and are documented (none in latest test run).

---

## Tools & Environment

| Tool            | Version / Description     |
|-----------------|---------------------------|
| Node.js         | v18.x.x                   |
| Jest            | v29.x.x                   |
| Supertest       | v6.x.x                    |
| PostgreSQL      | Cloud DB (mocked during tests) |
| OpenAI API      | Mocked for testing        |
| Gemini API      | Mocked for testing        |

## How to Run
Follow these steps to run the **test suites** for the **Food Detection Project Backend API** in **development mode**.

---

1. Install Dependencies (Development Mode)

Install all the necessary **development dependencies** before running the tests.

Run the following command to install **TypeScript**, **Jest**, and additional testing tools as **devDependencies**:

```bash
npm install --save-dev typescript jest ts-jest @types/jest supertest @types/supertest
```

Once installed, your project will be ready for unit and integration testing.

---

2. Configure `package.json` Scripts

Ensure the following `scripts` section is present in the **backend** project's `package.json` file:

```json
"scripts": {
  "start": "node server.js",
  "test": "jest --coverage"
}
```

- `start`: Runs the backend server.
- `test`: Runs all tests with Jest and generates a coverage report.

---

3. Configure Environment Variables for Testing

Create a `.env` file in the **backend** root directory. This file should include all environment variables required for running tests in **development mode**.

Example `.env.test` file:

```
DATABASE_URL=postgres://localhost:5432/food_detection_test
OPENAI_API_KEY=dev-test-openai-key
GEMINI_API_KEY=dev-test-gemini-key
JWT_SECRET=dev-testing-secret
```

> **Note:** During testing, external services like OpenAI and Gemini are mocked. Real API keys are not required.

---

## 4. Run Tests in Development Mode

To run all **unit** and **integration** tests with coverage, use the following command:

```bash
npm run test
```

## Testing Notes
- "spoonacularService.js" was not tested simply because the spoonacular API was not used any more in the final version.
