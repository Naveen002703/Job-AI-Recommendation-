import "../styles/Dashboard.css";
import React from "react";

const Dashboard = () => {
  const skills = JSON.parse(localStorage.getItem("skills")) || [];
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  return (
    <div className="dashboard">

      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <h2>👑 Your Skills</h2>

        <div className="skills-container">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <span key={index} className="skill-chip">
                {skill}
              </span>
            ))
          ) : (
            <p>No skills found</p>
          )}
        </div>
      </div>

      {/* CENTER */}
      <div className="job-feed">
        <h2>🤖 AI Recommended Jobs</h2>

        {jobs.length > 0 ? (
          <div className="job-grid">
            {jobs.map(job => {
              const matchPercent = Math.min(job.matchCount * 25, 100);

              return (
                <div key={job.id} className="job-card">

                  <h3>{job.title}</h3>
                  <p className="company">{job.company}</p>
                  <p className="location">📍 {job.location}</p>
                  <p className="salary">💰 {job.salary}</p>

                  {/* MATCH BAR */}
                  <div className="match-bar">
                    <div
                      className="match-fill"
                      style={{ width: `${matchPercent}%` }}
                    ></div>
                  </div>

                  <p className="match-text">
                    🔥 Match: {matchPercent}%
                  </p>

                  <button className="apply-btn">
                    Apply Now 🚀
                  </button>

                </div>
              );
            })}
          </div>
        ) : (
          <p>No jobs found 😔</p>
        )}
      </div>

    </div>
  );
};

export default Dashboard;