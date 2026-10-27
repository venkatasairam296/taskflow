const API_URL = import.meta.env.VITE_AUTH_API_URL || "http://localhost:5000/api/auth";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || "Internal server error");
  }

  return data;
}

export async function register(email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || "Internal server error");
  }

  return data;
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/me`, {
    credentials: "include"
  });

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || "Internal server error");
  }

  return data;
}

export async function logout() {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include"
  });

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || "Internal server error");
  }

  return data;
}