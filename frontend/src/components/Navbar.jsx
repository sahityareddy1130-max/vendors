import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-slate-900">
          Local Vendor Website Builder
        </Link>
        <nav className="flex items-center gap-3 text-sm text-slate-600">
          <Link className="hover:text-slate-900" to="/">Home</Link>
          <Link className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700" to="/create">
            Create Your Website
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
