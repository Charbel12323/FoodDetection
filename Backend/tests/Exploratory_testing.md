# Exploratory Testing Plan - Food Detection Project

This document outlines our exploratory testing approach for the Food Detection app. The goal is to uncover usability issues, edge cases, and defects that might not be caught by our unit and integration tests.

---

## Objectives

- **Evaluate User Flows:**  
  Test sign-up, login, logout, and session persistence in real-world scenarios.
  
- **Assess Inventory Management:**  
  Explore adding, updating, and deleting ingredients, including handling unusual inputs.
  
- **Validate Recipe Suggestion Flow:**  
  Interact with the Gemini/OpenAI integration to generate recipes, testing for both expected and error conditions.
  
- **Review UI and Navigation:**  
  Verify that dynamic UI updates, sidebar navigation, and animations are responsive and intuitive.

---

## Testing Charters and Session Plans

Each testing session is time-boxed and focused on a specific charter.

### Session 1: Authentication and Session Management
- **Timebox:** 60 minutes  
- **Objective:** Validate that user sign-up, login, and logout function correctly, including edge cases and error handling.  
- **Steps:**
  1. **Sign-Up:**  
     - Enter valid data and verify that the account is created (check for a confirmation message and user redirection).
     - Attempt sign-up with missing fields (e.g., no email) and verify that proper error messages are displayed.
  2. **Login:**  
     - Log in with valid credentials and confirm the user data is loaded (e.g., the Sidebar displays the correct username and email).
     - Try logging in with invalid credentials and observe error messages.
  3. **Logout:**  
     - Click the Logout button in the Sidebar and verify that the user data is cleared and the app navigates to the login screen.
  4. **Session Persistence:**  
     - After a successful login, restart the app and check if the session persists (or correctly expires, based on your design).

### Session 2: Inventory Management
- **Timebox:** 60 minutes  
- **Objective:** Explore the behavior of the inventory features under various conditions.  
- **Steps:**
  1. **Add Ingredient:**  
     - Add a valid ingredient (e.g., "Tomato") and verify it appears in the inventory list.
     - Attempt to add an ingredient with invalid data (e.g., an empty string, special characters) and verify the error handling.
  2. **Update Ingredient:**  
     - If editing is supported, modify an ingredient and check that the update is reflected correctly.
  3. **Delete Ingredient:**  
     - Remove an ingredient and verify that it is deleted from the inventory.
  4. **Boundary Conditions:**  
     - Enter extremely long ingredient names or add a large number of ingredients to test performance and UI behavior.

### Session 3: Recipe Suggestion Flow
- **Timebox:** 60 minutes  
- **Objective:** Validate the end-to-end flow of generating recipes using Gemini/OpenAI integration.  
- **Steps:**
  1. **Valid Recipe Request:**  
     - Submit a valid list of ingredients and confirm that a recipe list is returned and displayed.
  2. **Invalid Inputs:**  
     - Submit an empty ingredient list or intentionally malformed data, and verify that the system returns proper error messages.
  3. **Error Simulation:**  
     - Temporarily disconnect from the network or simulate a slow connection to observe how the app handles API timeouts.
  4. **UI Behavior:**  
     - Check loading spinners, error displays, and the overall responsiveness during the recipe generation process.

### Session 4: UI and Navigation
- **Timebox:** 60 minutes  
- **Objective:** Ensure that the overall UI is responsive, navigation is intuitive, and dynamic elements (such as animations) work correctly.  
- **Steps:**
  1. **Navigation Testing:**  
     - Use the Sidebar to navigate between Home, Inventory, Favorites, etc., and verify the correct content is displayed.
  2. **Rapid Interactions:**  
     - Tap buttons rapidly and try to trigger multiple navigations in quick succession to identify any race conditions.
  3. **Responsive Layout:**  
     - Resize the browser window (for web) or use different device simulators to verify that the UI adapts properly.
  4. **Animation and Transition Testing:**  
     - Observe the sidebar animations, loading indicators, and transitions between screens for smoothness and any glitches.

---

## Session Notes 



| **Session** | **Charter**                             | **Steps Taken**                                                                                                                                                                                                                                                                   | **Observations/Defects**                                                                                                                                                                                                             | **Severity** | **Notes/Next Steps**                                                                                   |
|-------------|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|--------------------------------------------------------------------------------------------------------|
| Session 1   | Authentication and Session Management   | - Signed up with valid data.<br>- Tried invalid sign-up with missing/incorrect data.<br>- Logged in with valid credentials.<br>- Tested logout by clicking the logout button.                                                                                                  | - Error messages for username/password requirements are fragmented: first, it complains about numbers (e.g., "no numbers allowed") and then, on subsequent attempts, it flags the minimum length requirement.                     | Minor        | Display all username and password requirements upfront and/or implement inline validation for immediate feedback.  |
| Session 2   | Inventory Management                    | - Added a valid ingredient (e.g., "Tomato") and confirmed it appears in the inventory list.<br>- Attempted to add ingredients with empty input and overly long text.<br>- Tested deletion of ingredients.<br>- Tested categorization by adding a "pickle".                         | - Error handling for empty input is unclear.<br>- The system miscategorizes some ingredients: for example, a "pickle" is identified as a condiment instead of a vegetable.                | Minor        | Enhance input validation.<br>Review and adjust the categorization logic to correctly classify ingredients like pickles as vegetables.                  |
| Session 3   | Recipe Suggestion Flow                  | - Submitted a valid ingredient list and verified that a recipe list is returned.<br>- Tested with an empty or malformed ingredient list.<br>- Noted that scanning sometimes takes longer than expected.                                                               | - Scanning response is slower at times, and there is no message to inform the user that the process is taking longer (or to check their connection).                                                                                                                                           | Minor        | Enhance the loading indicator/message during scanning to inform users when processing is slower than usual, possibly advising them to check their connection.                |
| Session 4   | UI and Navigation                       | - Navigated between different sections using the sidebar.<br>- Tapped buttons rapidly to test responsiveness.<br>- Resized the browser window and tested on different screen sizes.                                                                                        | - Sidebar occasionally flickers when navigation buttons are tapped rapidly.<br>- Some animations could be smoother under high interaction loads.                                                                                  | Minor        | Review animation timing and implement debouncing on rapid interactions to ensure smooth transitions.  |



# Reporting and Follow-Up

## Summary of Findings

**Authentication and Session Management:**
- **Fragmented Validation Feedback:**  
  When users attempt to sign up, error messages are provided in multiple steps (e.g., first "no numbers allowed" and then "minimum 6 characters required"). This forces users to make several attempts before they fully understand the requirements.

**Inventory Management:**
- **Input Validation Issues:**  
  Error handling for empty or invalid ingredient inputs is unclear.
- **Categorization Accuracy:**  
  Some ingredients are misclassified. For example, a "pickle" is identified as a condiment instead of a vegetable.

**Recipe Suggestion Flow:**
- **Slow Scanning Feedback:**  
  The scanning process occasionally takes longer than expected without informing the user, leaving them unaware of potential connection issues or processing delays.

**UI and Navigation:**
- **Sidebar Flickering:**  
  When rapidly tapping navigation buttons, the sidebar sometimes flickers, impacting the smoothness of user interactions.

---

## Prioritization of Issues

All identified issues are currently classified as **Minor**; however, they affect overall usability and user experience. The recommended priorities are:

1. **Enhance Validation Feedback (Authentication)**
   - **Priority:** Minor
   - **Action:** Display all username and password requirements upfront or implement inline validation so that users receive immediate and clear feedback.

2. **Review and Adjust Categorization Logic (Inventory Management)**
   - **Priority:** Minor
   - **Action:** Update the categorization logic to correctly classify ingredients (e.g., ensuring that pickles are categorized as vegetables).

3. **Improve Loading Feedback for Scanning (Recipe Suggestion Flow)**
   - **Priority:** Minor
   - **Action:** Implement a loading indicator or message that informs users if the scanning process takes longer than expected, advising them to check their connection if necessary.

4. **Smooth Out Sidebar Animations (UI and Navigation)**
   - **Priority:** Minor
   - **Action:** Review animation timing and consider implementing debouncing on rapid interactions to reduce flickering.

---

## Plan for Retesting

After the above fixes are implemented, retesting should focus on verifying that the issues have been resolved:

- **Authentication Flow:**
  - Verify that inline validations or upfront guidelines allow users to sign up without multiple attempts.
  
- **Inventory Categorization:**
  - Test adding and updating ingredients to ensure items like pickles are correctly categorized as vegetables.

- **Scanning Process:**
  - Confirm that when scanning takes longer, a clear loading message is displayed and users are informed about potential connection issues.

- **UI and Navigation:**
  - Re-test the sidebar navigation and rapid tapping interactions to ensure that any flickering has been resolved.

Compile all retesting notes and compare them against the original findings to confirm that the fixes are effective.



---

