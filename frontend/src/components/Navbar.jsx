import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, getUser, logout } from "../utils/auth";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Hide navbar on login/register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const user = getUser();
  const role = user?.role;

  // Close dropdown if click outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Logout",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>
          BookStore
        </Link>
      </div>

      <div style={styles.right}>
        {!isLoggedIn() ? (
          <>
            <Link to="/login" style={styles.btnWhite}>
              Login
            </Link>
            <Link to="/register" style={styles.btnBlue}>
              Register
            </Link>
          </>
        ) : (
          <>
            {role === "admin" && (
              <Link to="/upload" style={styles.btnBlue}>
                Upload Book
              </Link>
            )}

            {/* ACCOUNT BUTTON */}
            <div style={styles.accountWrapper} ref={dropdownRef}>
              <div
                style={styles.userInfo}
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <div style={styles.avatar}>
                  {user.username?.charAt(0)?.toUpperCase()}
                </div>
                <span style={styles.username}>{user.username}</span>
                <span style={styles.caret}>▼</span>
              </div>

              {/* DROPDOWN */}
              {openDropdown && (
                <div style={styles.dropdown}>
                  <button onClick={handleLogout} style={styles.dropdownItem}>
                    Logout
                  </button>
                </div>
              )}
            </div>
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

  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
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

  accountWrapper: {
    position: "relative",
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: 8,
    background: "#f1f5f9",
    border: "1px solid #dce3eb",
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#0b63a8",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 16,
  },

  username: {
    fontSize: 14,
    fontWeight: 600,
    color: "#333",
  },

  caret: {
    fontSize: 12,
    marginLeft: 4,
  },

  dropdown: {
    position: "absolute",
    top: 55,
    right: 0,
    background: "#ffffff",
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    padding: "10px 0",
    minWidth: 160,
    zIndex: 20,
  },

  dropdownItem: {
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    padding: "10px 20px",
    fontSize: 14,
    cursor: "pointer",
    color: "#d9534f",
    fontWeight: 600,
  },
};
