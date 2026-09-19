import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </Link>
        </div>

        <ul className="flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/tasks" className="cursor-pointer transition hover:text-slate-900">
            Tasks
          </Link>
          <Link to="/about" className="cursor-pointer transition hover:text-slate-900">
            About
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;