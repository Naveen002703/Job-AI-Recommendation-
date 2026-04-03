import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const paths = ["/", "/dashboard", "/resume", "/jobs"];
  const names = ["Home", "Dashboard", "Resume", "Jobs"];

  return (
    <nav className="navbar">
      
      {/* FIXED CLASS NAME */}
      <div className="logo-text">JobAI</div>

      <ul className="nav-links">
        {paths.map((path, index) => (
          <li key={index}>
            <Link
              to={path}
              className={location.pathname === path ? "active" : ""}
            >
              {names[index]}
            </Link>
          </li>
        ))}
      </ul>

      <div className="auth-buttons">
        <Link to="/login" className="btn login">Login</Link>
        <Link to="/register" className="btn register">Register</Link>
      </div>

    </nav>
  );
};

export default Navbar;