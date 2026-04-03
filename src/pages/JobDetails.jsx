import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaShareAlt } from "react-icons/fa";
import { jobs } from "../data/jobs";
import "../styles/JobDetails.css";

const JobDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);

  const job =
    state?.job ||
    jobs.find(j => j.id === parseInt(id)) ||
    JSON.parse(localStorage.getItem("selectedJob"));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(stored);
  }, []);

  if (!job) return <h2 className="error">Job not found 😢</h2>;

  const isSaved = savedJobs.find(j => j.id === job.id);

  const toggleSave = () => {
    let updated;
    if (isSaved) {
      updated = savedJobs.filter(j => j.id !== job.id);
    } else {
      updated = [...savedJobs, job];
    }

    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  const shareJob = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied 🔗");
  };

  const applyNow = () => {
    localStorage.setItem("selectedJob", JSON.stringify(job));
    navigate("/apply", { state: { job } });
  };

  const similarJobs = jobs.filter(j =>
    j.skill === job.skill && j.id !== job.id
  );

  return (
    <div className="details-wrapper">

      <div className="top-bar">
        <h2>{job.company}</h2>

        <div className="top-actions">
          <button onClick={toggleSave}>
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>

          <button onClick={shareJob}>
            <FaShareAlt />
          </button>
        </div>
      </div>

      <div className="details-card">

        <h1>{job.title}</h1>

        <div className="meta">
          <span>📍 {job.location || "Remote"}</span>
          <span>💼 {job.type || "Full-Time"}</span>
          <span className="salary">💰 {job.salary || "5-12 LPA"}</span>
        </div>

        <div className="skills">
          {job.skill?.split(",").map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>

        <div className="desc">
          <h3>Job Description</h3>
          <p>
            {job.description ||
              "We are looking for a passionate developer to join our team and build amazing applications."}
          </p>
        </div>

        <div className="actions">
          <button className="apply-btn" onClick={applyNow}>
            Apply Now 
          </button>

          <button className="back-btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>

      </div>

      <div className="similar">
        <h2>🔥 Similar Jobs</h2>

        {similarJobs.length === 0 && <p>No similar jobs found</p>}

        <div className="similar-grid">
          {similarJobs.map((j) => (
            <div
              key={j.id}
              className="similar-card"
              onClick={() =>
                navigate(`/job/${j.id}`, { state: { job: j } })
              }
            >
              <h4>{j.title}</h4>
              <p>{j.company}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default JobDetails;