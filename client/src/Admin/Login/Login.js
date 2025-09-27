import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Pfad anpassen

import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);     
        navigate("/admin");  
      } else {
        const data = await res.json();
        setError(data.message || "Login fehlgeschlagen");
      }
    } catch (err) {
      setError("Server nicht erreichbar");
    }
  }

  return (
    <form className="login" onSubmit={handleLogin}>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Benutzername"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Passwort"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
