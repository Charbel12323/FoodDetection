# 🧪 Testing Document - Food Detection Project

---

## Overview

This test plan is designed to ensure that the Food Detection system's backend API and associated services are robust, reliable, and function as intended. Our testing strategy includes:

- **Unit Testing:** Verifying individual controller/service functions in isolation.
- **Integration Testing:** Ensuring that routes, controllers, and services work together seamlessly.
- **Exploratory Testing:** Conducting time-boxed sessions to uncover usability issues, edge cases, and unexpected behaviors.

---

## Testing Strategy

### 1. Unit Testing
- **Goal:** Ensure each controller/service function works in isolation.
- **Method:** Mock external dependencies (database, LLM APIs).
- **Tools:** Jest, along with mocking libraries.

### 2. Integration Testing
- **Goal:** Verify that routes, controllers, and services work together.
- **Method:** Use Supertest to simulate HTTP requests.
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



### 4. Exploratory Testing
- **Goal:** Identify usability issues, edge cases, and unexpected behaviors that may not be covered by scripted tests.
- **Approach:** Conduct time-boxed sessions focused on specific charters.
- **Charters:**
  - **Charter 1: Authentication and Session Management**  
    *Objective:* Verify sign-up, login, logout, and session persistence under normal and edge-case scenarios.  
    *Steps:* Test sign-up with valid/invalid data; log in with valid/invalid credentials; test logout and session persistence.  
    *Expected Outcome:* Clear error messages and smooth authentication flows.
  
  - **Charter 2: Inventory Management**  
    *Objective:* Ensure that adding, updating, deleting, and categorizing ingredients functions correctly.  
    *Steps:* Add valid ingredients (e.g., "Tomato"); attempt invalid inputs; test deletion; verify categorization (e.g., "pickle" should be classified as a vegetable).  
    *Expected Outcome:* Inventory accurately reflects changes and categorization is correct.
  
  - **Charter 3: Recipe Suggestion Flow**  
    *Objective:* Validate the end-to-end flow of generating recipes via Gemini/OpenAI integration.  
    *Steps:* Submit a valid ingredient list and verify that a recipe list is returned; test with an empty or malformed list; note if scanning takes longer than expected.  
    *Expected Outcome:* Clear loading feedback when scanning delays occur and correct recipe output.
  
  - **Charter 4: UI and Navigation**  
    *Objective:* Ensure the overall UI is responsive, intuitive, and that navigation flows work seamlessly.  
    *Steps:* Use the sidebar to navigate between views; test rapid tapping and responsiveness across different screen sizes.  
    *Expected Outcome:* Seamless navigation and smooth UI transitions.

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

### Test Users
| Username | Password  |
|----------|-----------|
| testuser | testpass  |

### Test Ingredients
| Ingredient Name |
|-----------------|
| Tomato          |
| Cheese          |
| Chicken         |

### Test Recipe Request (Gemini/OpenAI)
| Type     | Data                                                          |
|----------|---------------------------------------------------------------|
| Image    | Base64 encoded image of food (for OpenAI)                     |
| Text     | `{"ingredients": ["tomato", "cheese"]}` (for Gemini service)  |

---

## Expected vs. Actual Results

| Test Description                                 | Expected Result                        | Actual Result | Status  |
|--------------------------------------------------|----------------------------------------|---------------|---------|
| User signup (valid data)                         | `201 Created` and user object          | `201 Created` | ✅ PASS |
| User login (valid credentials)                   | `200 OK` and JWT token                 | `200 OK`      | ✅ PASS |
| Add ingredient                                   | `200 OK` and confirmation message      | `200 OK`      | ✅ PASS |
| Get ingredients (existing user)                  | List of ingredients                    | Matches       | ✅ PASS |
| Delete ingredient (valid ID)                     | `200 OK` and delete confirmation       | `200 OK`      | ✅ PASS |
| Gemini recipe generation (valid request)         | JSON recipe list                       | JSON received | ✅ PASS |
| OpenAI image analysis (valid image)              | JSON with analysis                     | JSON received | ✅ PASS |
| DB failure (mocked)                              | `500 Internal Server Error` returned   | `500` error   | ✅ PASS |
| Invalid recipe generation (missing ingredients)  | `400 Bad Request`                      | `400` error   | ✅ PASS |

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
## Exploratory Testing Outcomes

| **Session** | **Charter**                             | **Steps Taken**                                                                                                                                                                                                                                                                   | **Observations/Defects**                                                                                                                                                                                                             | **Severity** | **Notes/Next Steps**                                                                                   |
|-------------|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|--------------------------------------------------------------------------------------------------------|
| Session 1   | Authentication and Session Management   | - Signed up with valid data.<br>- Tried invalid sign-up with missing/incorrect data.<br>- Logged in with valid credentials.<br>- Tested logout by clicking the logout button.                                                                                                  | - Error messages for username/password requirements are fragmented: first, it complains about numbers (e.g., "no numbers allowed") and then, on subsequent attempts, it flags the minimum length requirement.                     | Minor        | Display all username and password requirements upfront and/or implement inline validation for immediate feedback.  |
| Session 2   | Inventory Management                    | - Added a valid ingredient (e.g., "Tomato") and confirmed it appears in the inventory list.<br>- Attempted to add ingredients with empty input and overly long text.<br>- Tested deletion of ingredients.<br>- Tested categorization by adding a "pickle".                         | - Error handling for empty input is unclear.<br>- The system miscategorizes some ingredients: for example, a "pickle" is identified as a condiment instead of a vegetable.                | Minor        | Enhance input validation.<br>Review and adjust the categorization logic to correctly classify ingredients like pickles as vegetables.                  |
| Session 3   | Recipe Suggestion Flow                  | - Submitted a valid ingredient list and verified that a recipe list is returned.<br>- Tested with an empty or malformed ingredient list.<br>- Noted that scanning sometimes takes longer than expected.                                                               | - Scanning response is slower at times, and there is no message to inform the user that the process is taking longer (or to check their connection).                                                                                                                                           | Minor        | Enhance the loading indicator/message during scanning to inform users when processing is slower than usual, possibly advising them to check their connection.                |
| Session 4   | UI and Navigation                       | - Navigated between different sections using the sidebar.<br>- Tapped buttons rapidly to test responsiveness.<br>- Resized the browser window and tested on different screen sizes.                                                                                        | - Sidebar occasionally flickers when navigation buttons are tapped rapidly.<br>- Some animations could be smoother under high interaction loads.                                                                                  | Minor        | Review animation timing and implement debouncing on rapid interactions to ensure smooth transitions.  |

---

## Reporting and Follow-Up

### Summary of Findings

- **Authentication and Session Management:**  
  - **Fragmented Validation Feedback:** Error messages for username/password requirements are provided in multiple steps, requiring multiple attempts before the user fully understands the requirements.

- **Inventory Management:**  
  - **Input Validation Issues:** Error handling for empty or invalid ingredient inputs is unclear.  
  - **Categorization Accuracy:** Some ingredients are misclassified; for example, a "pickle" is identified as a condiment instead of a vegetable.

- **Recipe Suggestion Flow:**  
  - **Slow Scanning Feedback:** The scanning process sometimes takes longer than expected without informing the user, leaving them unaware of potential network or processing delays.

- **UI and Navigation:**  
  - **Sidebar Flickering:** Rapid tapping of navigation buttons causes occasional flickering in the sidebar.

### Prioritization of Issues

All identified issues are currently classified as **Minor**, but they affect overall usability. Recommended actions:

1. **Enhance Validation Feedback (Authentication):**  
   - **Action:** Display all username and password requirements upfront or implement inline validation to provide immediate feedback.

2. **Review and Adjust Categorization Logic (Inventory Management):**  
   - **Action:** Update the categorization logic to correctly classify ingredients (e.g., ensuring that pickles are categorized as vegetables).

3. **Improve Loading Feedback for Scanning (Recipe Suggestion Flow):**  
   - **Action:** Implement a loading indicator or message to inform users if scanning takes longer than expected, advising them to check their connection if necessary.

4. **Smooth Out Sidebar Animations (UI and Navigation):**  
   - **Action:** Review animation timing and implement debouncing on rapid interactions to reduce flickering.

### Plan for Retesting

After fixes are implemented, retesting should focus on verifying that the issues have been resolved:

- **Authentication Flow:**  
  - Confirm that inline validations or upfront guidelines allow users to sign up without multiple attempts.

- **Inventory Management:**  
  - Test adding and updating ingredients to ensure items like pickles are correctly categorized as vegetables.

- **Scanning Process:**  
  - Verify that when scanning takes longer, a clear loading message is displayed and users are informed about potential connection issues.

- **UI and Navigation:**  
  - Re-test sidebar navigation and rapid tapping interactions to ensure any flickering has been resolved.

Compile retesting notes and compare them against the original findings to confirm that the fixes are effective.

---

## Tools & Environment

| Tool            | Version / Description                 |
|-----------------|---------------------------------------|
| Node.js         | v18.x.x                               |
| Jest            | v29.x.x                               |
| Supertest       | v6.x.x                                |
| PostgreSQL      | Cloud DB (mocked during tests)        |
| OpenAI API      | Mocked for testing                    |
| Gemini API      | Mocked for testing                    |

---

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
