

// services/authService.js
const BASE_URL = "https://fooddetection-production.up.railway.app";
// or wherever your Express server runs

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
}

export async function signup(username, email, password) {
  const response = await fetch(`${BASE_URL}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Sign up failed');
  }
  return data;
}
