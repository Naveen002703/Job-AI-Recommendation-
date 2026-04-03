import React from "react";
import "../styles/Footer.css";

import { FaFacebook, FaLinkedin, FaInstagram,FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <h2>JobAI</h2>

      <p>AI Powered Job Recommendation System</p>

      <div className="social-links">
        <a href="https://www.facebook.com/lallu.naveen.77"><FaFacebook /></a>
        <a href="https://www.instagram.com/_naveen_o27/"><FaInstagram /></a>
        <a href="https://www.linkedin.com/in/naveen-jakkula-72066b360/"><FaLinkedin /></a>
        <a href="https://github.com/Naveen002703"><FaGithub /></a>
      </div>

      <div className="footer-bottom">
        © 2024 JobAI. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;