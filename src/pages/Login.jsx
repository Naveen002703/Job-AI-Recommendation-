import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser) {
      alert("No user found. Please register first ❌");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("user", JSON.stringify(storedUser));

      alert("Login Successful ✅");
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Welcome Back</h2>
        <p className="login-subtitle">
          Login to continue 🚀
        </p>

        <form className="login-form" onSubmit={handleLogin}>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="login-footer">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;