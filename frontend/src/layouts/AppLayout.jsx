import { Link, NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const navClass = ({ isActive }) =>
  `transition ${isActive ? "text-brand-coral" : "text-brand-ink hover:text-brand-moss"}`;

function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-brand-ink/10 bg-brand-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-display text-xl font-semibold text-brand-ink">
            Why My Video Flopped
          </Link>
          <nav className="flex items-center gap-5 text-sm font-semibold">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>
            <NavLink to="/pricing" className={navClass}>
              Pricing
            </NavLink>
            {user ? (
              <>
                <NavLink to="/dashboard" className={navClass}>
                  Dashboard
                </NavLink>
                <button onClick={logout} className="rounded-full bg-brand-ink px-4 py-2 text-white">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navClass}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="rounded-full bg-brand-coral px-4 py-2 text-white transition hover:bg-brand-moss"
                >
                  Start Free
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
