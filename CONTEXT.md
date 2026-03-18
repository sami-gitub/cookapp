# Context and Development Rules - Recipe & Anti-Waste App

## 1. Tech Stack
- **Core Framework:** React Native with Expo (latest version).
- **Navigation:** Expo Router (file-based routing within the `/app` directory).
- **Language:** TypeScript (Strict mode enabled).
- **Styling:** React Native `StyleSheet` (or NativeWind if specified).
- **Icons:** Use `@expo/vector-icons` (Lucide, Ionicons, or FontAwesome).
- **State Management:** React Context or Zustand (to manage user state and AI scan quotas).

## 2. Project Architecture (Strictly Enforced)
The folder structure must be clean and modular:
- `/app` : Main screens (Home, Favorites, Profile) and modals (Scanner).
- `/components` : Reusable UI components (Buttons, Recipe Cards, SearchBar).
- `/hooks` : Custom business logic (e.g., `useScanner`, `useQuotas`).
- `/services` : API calls (OpenAI/Gemini for the scanner, Backend BaaS).
- `/constants` : Theme (Colors, Typography), mocked data (recipe JSONs).
- `/assets` : Images, fonts (prepare space for the "Chef Rat" mascot).

## 3. Coding Best Practices
- **Modern React:** Use ONLY functional components and Hooks. No React classes.
- **UI/UX:** - Always handle phone notches using `SafeAreaView`.
  - Use `KeyboardAvoidingView` for screens with text inputs (like the search bar).
  - Always implement loading states (spinners/skeletons) and error states.
- **Separation of Concerns:** Do not mix API fetching logic with UI rendering. Use custom `/hooks` for logic.

## 4. Strict Rules for AI Agent (Vibe Coding)
- **No Hallucinations:** Do not invent third-party libraries. Stick to standard Expo ecosystem tools.
- **Permission Required:** Always ask before running an installation command (`npx expo install ...`).
- **Short Iterations:** Code one feature at a time. Do not generate hundreds of lines of code at once.
- **Mock First:** As long as the backend (Supabase/Firebase) is not set up, use static data (JSON files in `/constants`) to display the recipe catalog.

---

## 📝 Product Requirements Document (PRD)

### 1. Concept and Vision (Elevator Pitch)
A multicultural cooking learning and anti-waste application. It offers a catalog of recipes from around the world with clear steps, and stands out with a flagship feature: a "Fridge Scanner" AI capable of analyzing leftovers via a photo to generate or suggest adapted recipes. The goal is to make daily life easier (especially for students), fight against food waste, and democratize global cuisine.

### 2. Target Audience
- **Primary Target:** Cooking novices and students (who will benefit from free/unlimited access to the AI).
- **Secondary Target:** Enthusiasts curious to discover new culinary cultures.
- **Tertiary Target (Evolution):** Professional chefs (promotional showcase for more gourmet recipes).

### 3. Unique Value Proposition
- **The "Fridge Scanner" AI:** Visual ingredient recognition for custom recipes.
- **Learning Clarity:** Simple visual steps, real and qualitative photos (no AI-generated images for the dishes).
- **Guaranteed Quality:** A healthy approach with a "Verified Recipe" label by the admin at launch.

### 4. V1 Functional Scope (MVP - To be coded first)
*This version focuses solely on the core value for a quick launch and efficient vibe coding.*
- **Basic Authentication:** Sign up/Login (email, Google, or Apple) essential for quota management.
- **"Official" Recipe Catalog:** Database managed by the admin. Clear display, basic filtering, real photos (artists/photographers).
- **The "Fridge Scanner" AI (Core Feature):**
  - Take a picture or upload from the phone gallery.
  - Visual analysis to list detected ingredients.
  - Generation of a custom text recipe (title, missing ingredients, steps) OR suggestion of an existing recipe from the catalog.
- **Freemium Model (Quota Management):**
  - Free users: Limited to 4-6 fridge scans per day.
  - Premium users: Unlimited scans (subscription or very high cap).

### 5. Long-Term Vision & Backlog (For V2 and beyond)
*Do not code these elements initially to stay focused on the MVP.*
- **Identity & Gamification:** Mascot (a little rat with a chef's hat, ref. Ratatouille), progression system for the user (earn badges, levels, evolve the mascot).
- **Community & Social Dimension:**
  - Complete user profiles (avatar, bio, favorites).
  - Recipe creation and sharing (UGC - User Generated Content).
  - Validation system: "Community Recipe" vs "Verified Recipe" badges.
  - "I tested it" feature: post a photo of your own result under the original recipe.
- **AI Evolution (Smart Assistant):** Advanced filters (allergies, gluten-free, vegetarian diets), integrated grocery list generation, weekly meal prep planning.
- **Learning & Cultural Tools:** Integrated cultural lexicon (e.g., history and origin of Yuzu), "Cooking in progress" mode (screen always on, large text, timer).
- **Student Accessibility:** Integration of an API (e.g., Student Beans) to verify student status and automatically unlock unlimited/free AI.

---

## 🗺️ User Flow (Screens to be coded)

Since the scanner is integrated into the home page, the bottom navigation bar (Bottom Tab) is reduced to 3 very clean tabs: 🏠 Home, ❤️ Favorites, and 👤 Profile.

Here is the detail of what will be on each screen:

### 1. 🏠 Home Screen (The Hub)
- **Header:** A small "Hello [First Name]! Ready to cook?" with perhaps the rat mascot in the corner.
- **The Search Bar:**
  - Text field ("Search for a recipe, an ingredient...").
  - **Microphone Icon 🎙️:** Activates voice dictation.
  - **Camera Icon 📸:** The magic button that launches the "Fridge Scanner".
- **Content (below):**
  - Quick filters or categories as pills (e.g., ⏱️ under 15 min, 🍜 Asian, 🥦 Vegetarian).
  - A carousel of "Recipes of the day" or "Student trends" (pulled from the official catalog).

### 2. 📸 The "Fridge Scanner" Flow (Launched from the camera icon)
*This is not a bottom tab, but a flow that opens up (Modal or Stack).*
- **Screen A:** The camera opens (with a button to import from the gallery).
- **Screen B (Loading):** A nice animation (maybe the rat thinking) while the AI analyzes the image.
- **Screen C (Result):**
  - The list of ingredients the AI saw (editable if the AI made a mistake).
  - The custom-generated recipe or catalog suggestion, with steps.
  - A "Save to favorites" button.

### 3. ❤️ Favorites Screen (The Recipe Book)
- A simple grid with all the recipes the user has "liked" or generated and saved.
- A small local search bar just to search within favorites.

### 4. 👤 Profile Screen (The Control Center)
- User info (Username, Email).
- **The AI Counter:** Crucial for the Freemium model (e.g., "You have 3 free scans left today" with a progress bar).
- A "Go Premium" button (for V1, this can just be an explanatory screen, no need to code Stripe payments on day 1).
- Settings (Logout, Terms of Service).