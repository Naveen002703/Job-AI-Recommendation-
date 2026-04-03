import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
];

const Home = () => {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  // change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">

      <div className="home-container">

        {/* LEFT CONTENT */}
        <div className="home-text">
          <h1>
            Find Your <span>Dream Job</span> with AI Precision...
          </h1>

          <p>
            AI-powered job recommendation system that matches your skills
            with the best opportunities instantly.
          </p>

          <div className="home-buttons">
            <button onClick={() => navigate("/jobs")} className="home-btn">
              Explore Jobs
            </button>

            <button onClick={() => navigate("/login")} className="home-btn-outline">
              Get Started
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="home-image">
          <img src={images[index]} alt="job illustration" />
        </div>

      </div>

    </div>
  );
};

export default Home;