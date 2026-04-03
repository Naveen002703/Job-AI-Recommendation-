import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import ResumeUpload from "./pages/ResumeUpload";
import Login from "./pages/Login";
import ApplyForm from "./pages/ApplyForm";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/resume" element={<ResumeUpload />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;