import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if(loading){
    return (
      <div>
        <p>Still Loading...</p>
      </div>
    )
  }

  if(!user){
    return <Navigate to="/login" replace />
  }

  return children;
}

export default ProtectedRoute;