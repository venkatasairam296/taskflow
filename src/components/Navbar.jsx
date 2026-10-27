import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useState } from "react";

const Navbar = ({ title }) => {
  const [error, setError] = useState(null);

  const { user, loading, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    setError(null);

    try {
      await logout();

      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </Link>
        </div>

        <ul className="flex items-center gap-8 text-sm font-medium text-slate-600">
          {!loading && user && (
            <li>
              <Link to="/tasks" className="cursor-pointer transition hover:text-slate-900">
                Tasks
              </Link>
            </li>
          )}

          <li>
            <Link to="/about" className="cursor-pointer transition hover:text-slate-900">
              About
            </Link>
          </li>

          {!loading && !user && (
            <li>
              <Link to="/login" className="cursor-pointer transition hover:text-slate-900">
                Login
              </Link>
            </li>
          )}
          {!loading && !user && (
            <li>
              <Link to="/register" className="cursor-pointer transition hover:text-slate-900">
                Register
              </Link>
            </li>
          )}
        </ul>

        {
          !loading && user && (
            <button className="cursor-pointer transition hover:text-slate-900" onClick={handleLogout}>Logout</button>
          )
        }
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}
    </nav>
  );
};

export default Navbar;