import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const ProtectedRoute = ({ children }) => {
  const { user, loading, error, checkAuth } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
          role="status"
          aria-live="polite"
        >
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
            aria-hidden="true"
          />

          <h2 className="mt-5 text-lg font-bold text-slate-900">
            Checking your session
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Please wait while we verify your authentication.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div
          className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm"
          role="alert"
        >
          <div
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600"
            aria-hidden="true"
          >
            !
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Unable to verify your session
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {error.message || "Something went wrong. Please try again."}
          </p>

          <button
            type="button"
            onClick={checkAuth}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;