import { createContext, useState, useEffect } from "react";
import { getCurrentUser, login as loginUser, register as registerUser, logout as logoutUser } from "../services/authApi.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  async function login(email, password) {
    try {
      setError(null);

      const user = await loginUser(email, password);

      setUser(user);

      return user;
    } catch (error) {
      setError(error.message || "Internal server error");
      throw error;
    }
  }

  async function register(email, password) {
    try {
      setError(null);

      const user = await registerUser(email, password);

      return user;
    } catch (error) {
      setError(error.message || "Internal server error");
      throw error;
    }
  }

  async function logout() {
    try {
      setError(null);

      await logoutUser();

      setUser(null);
    } catch (error) {
      setError(error.message || "Internal server error");
      throw error;
    }
  }

  useEffect(() => {
    async function currentUser() {
      try {
        setError(null);

        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        setError(error.message || "Failed to get user details");
        setUser(null);
      }finally{
        setLoading(false);
      }
    }
    currentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }} >
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;