import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      console.log("API URL:", API);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
