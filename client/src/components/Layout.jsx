import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="app-shell">
      <header className="navbar">
        <Link to="/" className="brand">
          DevTrack
        </Link>
        <nav>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/problems">Problems</NavLink>
          <NavLink to="/projects">Projects</NavLink>
        </nav>
        <div className="user-area">
          <span>{user?.name}</span>
          <button className="ghost" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
