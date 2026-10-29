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

  async function checkAuth() {
    try {
      setLoading(true);
      setError(null);

      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      if(error.status === 401){
        setUser(null);
        setError(null);
      }else{
        setError(error.message || "Failed to get user details");
      }
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    function handleSessionExpired(){
      setUser(null);
      setError(null);
    }

    async function initializeAuth() {
      try {
        const currentUser = await getCurrentUser();

        if(!cancelled){
          setUser(currentUser);
        }
      } catch (error) {
        if(!cancelled){
          if(error.status === 401){
            setUser(null);
            setError(null);
          }else{
            setError(error.message || "Failed to get user details");
          }
        }
      } finally {
        if(!cancelled){
          setLoading(false);
        }
      }
    }

    window.addEventListener(
      "taskflow:session-expired",
      handleSessionExpired
    );

    initializeAuth();

    return () => {
      window.removeEventListener(
        "taskflow:session-expired",
        handleSessionExpired
      );
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, checkAuth }} >
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;