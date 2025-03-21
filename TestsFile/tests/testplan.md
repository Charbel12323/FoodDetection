# 🧪 Testing Document - Food Detection Project
SENG 401 – Team Project  
Team Members: [Add names]

---

## ✅ Test Plan
The purpose of the test plan is to ensure the **Backend API** for the Food Detection system is robust, reliable, and functions as intended.  
We focus on **unit testing**, **integration testing**, and **validation** across:

- Controllers (API endpoints)
- Services (business logic, database queries, external APIs)
- Routes (HTTP interface)

---

## ✅ Testing Strategy

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

## ✅ Unit Test Coverage

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
| spoonacularService          | 27.27%       | 0%       | 0%          | 27.27%  |

---

## ✅ Integration Test Coverage

| Route                | Tests Description                                 | Status  |
|----------------------|---------------------------------------------------|---------|
| `/api/auth`          | Sign up, login, authentication flows              | ✅ PASS |
| `/api/gemini`        | Recipe generation from Gemini LLM                 | ✅ PASS |
| `/api/ingredients`   | Add, get, delete ingredients                      | ✅ PASS |
| `/api/openai`        | Image analysis via OpenAI                         | ✅ PASS |
| `/api/recipes`       | Add and retrieve recipes                          | ✅ PASS |

---

## ✅ Test Data Set

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

## ✅ Expected vs Actual Results

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

## ✅ Test Results Summary

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

Coverage Summary  
--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------|---------|----------|---------|---------|-------------------
All files                 |   95.51 |    88.23 |      90 |   95.41 |                   
 Backend                  |    90.9 |       75 |       0 |    90.9 |                   
  server.js               |    90.9 |       75 |       0 |    90.9 | 30-31             
 Backend/config           |     100 |      100 |     100 |     100 |                   
  db.js                   |     100 |      100 |     100 |     100 |                  
 Backend/controllers      |     100 |    96.87 |     100 |     100 |                  
  authController.js       |     100 |      100 |     100 |     100 |                  
  geminiController.js     |     100 |      100 |     100 |     100 |                  
  ingredientController.js |     100 |    91.66 |     100 |     100 | 22               
  openaiController.js     |     100 |      100 |     100 |     100 |                  
  recipeController.js     |     100 |      100 |     100 |     100 |                  
 Backend/routes           |     100 |      100 |     100 |     100 |                  
  authRoutes.js           |     100 |      100 |     100 |     100 |                  
  geminiRoutes.js         |     100 |      100 |     100 |     100 |                  
  ingredientRoutes.js     |     100 |      100 |     100 |     100 |                  
  openaiRoutes.js         |     100 |      100 |     100 |     100 |                  
  recipeRoutes.js         |     100 |      100 |     100 |     100 |                  
 Backend/services         |   89.53 |       80 |    87.5 |   89.28 |                  
  geminiService.js        |   97.95 |     92.3 |     100 |   97.87 | 112              
  recipeService.js        |     100 |      100 |     100 |     100 |                             
--------------------------|---------|----------|---------|---------|-------------------


---

## ✅ Validation Plan

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

## ✅ Tools & Environment

| Tool            | Version / Description     |
|-----------------|---------------------------|
| Node.js         | v18.x.x                   |
| Jest            | v29.x.x                   |
| Supertest       | v6.x.x                    |
| PostgreSQL      | Cloud DB (mocked during tests) |
| OpenAI API      | Mocked for testing        |
| Gemini API      | Mocked for testing        |
