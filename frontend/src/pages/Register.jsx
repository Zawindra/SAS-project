import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/api/auth/register", {
      username,
      email,
      password,
    });

    navigate("/login");
  };

  const bg = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1A73E8 0%, #FFFFFF 100%)",
    margin: 0,
    padding: 0,
};


  const card = {
    background: "white",
    padding: "40px",
    width: "400px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  return (
    <div style={bg}>
      <form style={card} onSubmit={submit}>
        <h2 style={{ color: "#1A73E8", marginBottom: "20px" }}>Register</h2>

        <input
          placeholder="Username"
          style={inputStyle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#1A73E8",
            color: "white",
            borderRadius: "5px",
            border: "none",
            fontWeight: "bold",
            marginTop: "10px",
            cursor: "pointer"
          }}
        >
          Register
        </button>

        <p style={{ marginTop: "20px" }}>
          Sudah punya akun? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
