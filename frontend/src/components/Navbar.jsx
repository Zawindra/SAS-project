import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, getUser, logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on login/register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const user = getUser();
  const role = user?.role;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>BookStore</Link>
      </div>

      <div style={styles.right}>
        {!isLoggedIn() && (
          <>
            <Link to="/login" style={styles.btnWhite}>Login</Link>
            <Link to="/register" style={styles.btnBlue}>Register</Link>
          </>
        )}

        {isLoggedIn() && (
          <>
            {role === "admin" && (
              <Link to="/upload" style={styles.btnBlue}>Upload Book</Link>
            )}

            <button onClick={handleLogout} style={styles.btnRed}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    height: "70px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  brand: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0b63a8",
    textDecoration: "none",
  },

  left: {
    display: "flex",
    alignItems: "center",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  btnWhite: {
    padding: "10px 18px",
    borderRadius: 8,
    background: "#fff",
    border: "1px solid #0b63a8",
    color: "#0b63a8",
    fontSize: 14,
    textDecoration: "none",
    cursor: "pointer",
  },

  btnBlue: {
    padding: "10px 18px",
    borderRadius: 8,
    background: "#0b63a8",
    color: "#fff",
    fontSize: 14,
    textDecoration: "none",
    cursor: "pointer",
  },

  btnRed: {
    padding: "10px 18px",
    borderRadius: 8,
    background: "#d9534f",
    color: "#fff",
    fontSize: 14,
    border: "none",
    cursor: "pointer",
  },
};
