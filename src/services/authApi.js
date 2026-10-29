import { apiRequest } from "./apiRequest.js";

const API_URL = import.meta.env.VITE_AUTH_API_URL || "http://localhost:5000/api/auth";

export async function login(email, password) {
  return apiRequest(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
}


export async function register(email, password) {
  return apiRequest(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
}

export async function getCurrentUser() {
  return apiRequest(`${API_URL}/me`);
}

export async function logout() {
  return apiRequest(`${API_URL}/logout`, {
    method: "POST"
  });
}