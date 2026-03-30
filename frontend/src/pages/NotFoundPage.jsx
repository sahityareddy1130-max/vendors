import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-soft">
      <h1 className="text-4xl font-semibold text-slate-900">Page Not Found</h1>
      <p className="mt-4 text-slate-600">The page you are looking for does not exist yet.</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500">
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
