import { apiRequest } from "./apiRequest.js";

const API_URL =
  import.meta.env.VITE_TASK_API_URL || "http://localhost:5000/api/tasks";

// Fetch all tasks
export async function getTasks() {
  return apiRequest(API_URL, {}, { requiresAuth: true });
}

// Create a new task
export async function createTask(taskData) {
  return apiRequest(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData)
    },
    { requiresAuth: true }
  );
}

// Update an existing task
export async function updateTask(id, taskData) {
  return apiRequest(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData)
    },
    { requiresAuth: true }
  );
}

// Delete a task
export async function deleteTask(id) {
  return apiRequest(`${API_URL}/${id}`, {
      method: "DELETE"
    },
    { requiresAuth: true }
  );
}