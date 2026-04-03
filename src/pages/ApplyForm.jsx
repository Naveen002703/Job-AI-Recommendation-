import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ApplyForm.css";

const ApplyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Try getting from state
  let job = location.state?.job;

  // ✅ Fallback (VERY IMPORTANT)
  if (!job) {
    job = JSON.parse(localStorage.getItem("selectedJob"));
  }

  // ❌ If still no job
  if (!job) {
    return (
      <div style={{ color: "white" }}>
        <h2>No job selected 😢</h2>
        <button onClick={() => navigate("/jobs")}>
          Go Back
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Applied for ${job.title} at ${job.company} ✅`);

    // 🔥 optional: clear selected job
    localStorage.removeItem("selectedJob");

    navigate("/");
  };

  return (
    <div className="apply-page">
      <div className="apply-card">
        <h2>Apply for {job.title}</h2>
        <p><strong>Company:</strong> {job.company}</p>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="file" required />

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;