const Navbar = ({ title }) => {
  return (
    <nav className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
        </div>

        <ul className="flex items-center gap-8 text-sm font-medium text-slate-600">
          <li className="cursor-pointer transition hover:text-slate-900">
            Tasks
          </li>
          <li className="cursor-pointer transition hover:text-slate-900">
            About
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;