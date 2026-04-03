const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

// ✅ IMPORT DATASET
const { jobs } = require("../data/jobs");

// 📂 STORAGE
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".pdf");
  },
});

const upload = multer({ storage });

// 🧠 SKILLS LIST
const skillList = [
  "react","javascript","css","html",
  "node","express","mongodb",
  "python","java","sql",
  "ml","ai","aws","docker","kubernetes",
  "excel","power bi","seo","testing"
];

// 🚀 MAIN ROUTE
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const pdfParse = require("pdf-parse");
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text.toLowerCase();

    // ✅ Extract Skills
    const extractedSkills = skillList.filter(skill =>
      text.includes(skill)
    );

    // 🤖 Match Jobs
    const recommendedJobs = jobs
      .map(job => {
        const jobSkills = job.skill
          .toLowerCase()
          .split(",")
          .map(s => s.trim());

        const matchCount = jobSkills.filter(skill =>
          extractedSkills.some(resumeSkill =>
            skill.includes(resumeSkill) ||
            resumeSkill.includes(skill)
          )
        ).length;

        return { ...job, matchCount };
      })
      .filter(job => job.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);

    const score = Math.min(60 + extractedSkills.length * 3, 100);

    res.json({
      skills: extractedSkills,
      score,
      jobs: recommendedJobs
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;