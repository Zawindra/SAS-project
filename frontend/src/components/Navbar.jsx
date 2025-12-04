import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, removeToken } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#ffffff",
    padding: "14px 32px",
    borderBottom: "1px solid #e6e9ef",
    position: "sticky",
    top: 0,
    zIndex: 50,
  };

  const linkBase = {
    textDecoration: "none",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
  };

  // warna link default
  const linkStyle = {
    ...linkBase,
    color: "#0b63a8",
  };

  // tombol biru
  const btnPrimary = {
    ...linkBase,
    padding: "8px 16px",
    background: "#0b63a8",
    color: "#fff",
    borderRadius: 6,
  };

  // tombol logout
  const btnOutline = {
    ...linkBase,
    padding: "8px 16px",
    border: "1px solid #0b63a8",
    color: "#0b63a8",
    borderRadius: 6,
    background: "none",
    cursor: "pointer",
  };

  return (
    <header style={navStyle}>
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "#0b63a8",
          textDecoration: "none",
        }}
      >
        BOOKSTORE
      </Link>

      {/* NAVIGATION */}
      <nav style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {!loggedIn ? (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>

            <Link to="/register" style={btnPrimary}>
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/upload-book" style={linkStyle}>
              Upload Book
            </Link>

            <button style={btnOutline} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}