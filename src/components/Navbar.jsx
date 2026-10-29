import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useState } from "react";

const Navbar = ({ title }) => {
  const [error, setError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    if (loggingOut) return;

    setError(null);
    setLoggingOut(true);

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      setError(error.message || "Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  const linkStyles =
    "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="rounded-lg text-xl font-extrabold tracking-tight text-slate-900 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-2xl"
        >
          {title}
          <span className="text-blue-600">.</span>
        </Link>

        {/* Navigation links */}
        <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
          {!loading && user && (
            <li>
              <Link to="/tasks" className={linkStyles}>
                Tasks
              </Link>
            </li>
          )}

          <li>
            <Link to="/about" className={linkStyles}>
              About
            </Link>
          </li>

          {!loading && !user && (
            <>
              <li>
                <Link to="/login" className={linkStyles}>
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-4"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Authentication action */}
        {!loading && user && (
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>

      {/* Logout error */}
      {error && (
        <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6 lg:px-8">
          <div
            role="alert"
            className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <p>{error}</p>

            <button
              type="button"
              onClick={() => setError(null)}
              aria-label="Dismiss logout error"
              className="shrink-0 rounded px-2 font-bold text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;