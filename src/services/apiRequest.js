export async function apiRequest(url, options = {}, { requiresAuth = false } = {}) {
  let response;

  try {
    response = await fetch(url, {
      ...options,
      credentials: "include",
    });
  } catch {
    throw new Error("Unable to connect to the server");
  }

  let data = null;

  try {
    data = await response.json();
  } catch {
    // The response may have an empty or invalid JSON body.
  }

  if (!response.ok) {
    if(response.status === 401 && requiresAuth){
      window.dispatchEvent(
        new Event("taskflow:session-expired")
      );
    }

    const error = new Error(data?.message || "Request failed");
    error.status = response.status;
    throw error;
  }

  return data;
}