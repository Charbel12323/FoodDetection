# 🧊 Fridge Scanning App

> Keep your mind fresh!

A cross-platform mobile app that helps transform leftover ingredients into delicious meals while minimizing food waste. Perfect for people with limited cooking experience, busy individuals, and budget-conscious users.

## 📑 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Problem & Solution](#problem--solution)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Team](#team)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The Fridge Scanning App leverages cutting-edge technologies like OpenCV for image processing and GPT-4 for natural language processing to help users manage their fridge contents effectively. The app scans, identifies, and logs ingredients, then suggests personalized meal ideas based on available items and dietary preferences.

## Features

### Core Functionality
- **Automated Fridge Scanning** 📸
  - Computer vision-powered ingredient recognition
  - Real-time scanning and identification
  
- **Smart Inventory Management** 📋
  - Automated ingredient logging
  - Manual inventory adjustments
  - Stock level tracking
  
- **AI-Powered Recipe Suggestions** 🧑‍🍳
  - Personalized meal recommendations
  - Dietary preference consideration
  - Step-by-step cooking instructions

### Additional Features
- **Health & Nutrition Tracking**
  - Macro nutrient information
  - Dietary goal integration
  - Meal planning assistance

- **Smart Grocery Management**
  - Automated shopping lists
  - Stock level notifications
  - Frequently bought items tracking

## Problem & Solution

### The Problem
Many people struggle with:
- Managing fridge contents effectively
- Reducing food waste
- Creating meals from available ingredients
- Understanding nutritional content

### Our Solution
The Fridge Scanning App addresses these challenges through:
- Intelligent ingredient recognition
- Automated inventory tracking
- AI-powered recipe suggestions
- Intuitive nutritional guidance

## Technology Stack

### Frontend
- React Native & NativeWind (Mobile)
- Next.js & Tailwind CSS (Web)

### Backend
- Node.js
- Python (OpenCV integration)
- OpenAI GPT-4

### Database
- PostgreSQL

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/fridge-scanning-app.git
cd fridge-scanning-app
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

## 🚀 Database Setup 
### 1️⃣ Create the `.env` File in `/backend` Directory  
Example `.env`:  
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=fridgeApp
DB_PORT=5432
OPENAI_API_KEY=your_openai_api_key
```  
👉 Important:  
- Ensure the environment variable is `DB_PASSWORD` (not `DB_PASS`).  
- Use the same credentials you configured for PostgreSQL.  
- If you're not using OpenAI yet, you can leave `OPENAI_API_KEY` empty.  

### 2️⃣ Setup PostgreSQL Database  
Use `psql` to connect to your PostgreSQL server:  
```bash
psql -h localhost -U postgres -d fridgeApp
```  
If `fridgeApp` doesn’t exist, create it:  
```sql
CREATE DATABASE "fridgeApp";
```  

### 3️⃣ Create Required Tables  
Inside `psql`, run the following SQL scripts to set up your tables:  
🔸 **Users Table**  
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);
```  
🔸 **User Ingredients Table**  
```sql
CREATE TABLE user_ingredients (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  ingredient VARCHAR(255) NOT NULL
);
```  
👉 Optional: Create additional tables (`recipes`, `shopping_list`) for extended features.  

### 4️⃣ Verify Tables (Optional but recommended)  
List all tables:  
```sql
\dt
```  
Check if `users` and `user_ingredients` tables exist.  
Test data retrieval:  
```sql
SELECT * FROM users;
SELECT * FROM user_ingredients;
```  

### Running the servers

Start the development servers:
```bash
# Frontend
npx expo start 

# Backend
node server.js
```

## Project Structure
```
fridge-scanning-app/
├── frontend/          # React Native & Next.js applications
├── backend/           # Node.js backend services & database
```

## Team

| Name | Role |
|------|------|
| Charbel | Project Manager |
| Aly | LLM Integration Engineer |
| Gisa | Backend Engineer & Data Scientist |
| Joshua | Frontend Engineer |
| Tara | Frontend Engineer |
| Lana | Backend Engineer |

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

📧 Email: charbel.maroun@ucalgary.ca
📧 Email: alymohammed.masani@ucalgary.ca

---

*Happy cooking and keep your mind fresh! 🌟*
