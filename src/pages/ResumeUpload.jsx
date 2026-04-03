import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Resume.css";

const Resume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (uploadedFile) => {
    const formData = new FormData();
    formData.append("resume", uploadedFile);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      // ❌ handle backend error
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Upload failed");
      }

      const data = await res.json();

      // ✅ Save safely
      localStorage.setItem("skills", JSON.stringify(data.skills || []));
      localStorage.setItem("jobs", JSON.stringify(data.jobs || []));

      // 🚀 Redirect
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    // ❌ file validation
    if (!uploadedFile) return;

    if (uploadedFile.type !== "application/pdf") {
      alert("Please upload a PDF file only 📄");
      return;
    }

    setFile(uploadedFile);
    handleUpload(uploadedFile);
  };

  return (
    <div className="resume-container">
      <div className="upload-box">
        <h2>Upload Your Resume 📄</h2>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

        {file && <p>Uploaded: {file.name}</p>}

        {loading && <p>⏳ Analyzing Resume...</p>}
      </div>
    </div>
  );
};

export default Resume;