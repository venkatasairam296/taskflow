const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

// Fetch all tasks
export async function getTasks() {
  const response = await fetch(API_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Internal server error");
  }

  return data;
}

// Create a new task
export async function createTask(taskData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Internal server error");
  }

  return data;
}

// Update an existing task
export async function updateTask(id, taskData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Internal server error");
  }

  return data;
}

// Delete a task
export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    let message = "Failed to delete task";

    try {
      const data = await response.json();
      message = data.message || message;
    } catch {
      // The server may return an empty response body.
    }

    throw new Error(message);
  }
}