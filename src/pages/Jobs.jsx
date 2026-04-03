import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import "../styles/Jobs.css";
import { jobs } from "../data/jobs";

const Jobs = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(stored);
  }, []);

  const toggleSaveJob = (job) => {
    let updated;
    const exists = savedJobs.find(j => j.id === job.id);

    if (exists) {
      updated = savedJobs.filter(j => j.id !== job.id);
    } else {
      updated = [...savedJobs, job];
    }

    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  const handleApply = (job) => {
    localStorage.setItem("selectedJob", JSON.stringify(job));
    navigate("/apply", { state: { job } });
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="jobs-container">

      {/* 🔍 PREMIUM SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search jobs, companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* JOB LIST */}
      <div className="jobs-grid">
        {filteredJobs.map((job) => {
          const isSaved = savedJobs.find(j => j.id === job.id);

          return (
            <div key={job.id} className="job-card">

              {/* HEADER */}
              <div className="job-top">
                <h3>{job.title}</h3>

                <button
                  className={`bookmark ${isSaved ? "active" : ""}`}
                  onClick={() => toggleSaveJob(job)}
                >
                  {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>

              <p className="company">{job.company}</p>

              {/* SKILLS */}
              <div className="skills">
                {job.skill?.split(",").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="actions">
                <button
                  className="apply-btn"
                  onClick={() => handleApply(job)}
                >
                  Apply Now
                </button>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/job/${job.id}`, { state: { job } })}
                >
                  Details
                </button>
              </div>

            </div>
          );
        })}
      </div>
      

      {/* NO RESULT */}
      {filteredJobs.length === 0 && (
        <p className="empty">No jobs found 🚫</p>
      )}

    </div>
  );
};

export default Jobs;