const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const resumeRoutes = require("./routes/resume");
app.use("/api/resume", resumeRoutes);


const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/jobai")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});