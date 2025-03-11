# Database Setup for FridgeApp

To create the correct database and build the necessary tables for **FridgeApp**, follow these steps:

## 1. Create the Database
Before creating tables, ensure you have the correct database:
```sql
CREATE DATABASE fridgeapp;
```

Switch to the newly created database:
```sql
\c fridgeapp
```

## 2. Create the `users` Table
```sql
-- Create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);
```

## 3. Create the `user_ingredients` Table
```sql
-- Create user_ingredients table
CREATE TABLE user_ingredients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    ingredient TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

## 4. Verify Tables
After executing the above commands, verify the tables were created correctly:
```sql
\d users
\d user_ingredients
```
This will display the table structures and confirm that the constraints and indexes are set up properly.
