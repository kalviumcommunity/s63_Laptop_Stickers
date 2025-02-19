import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate(); // ✅ React Router Hook

  return (
    <div className="landing-page">
      {/* Overlay for readability */}
      <div className="overlay">
        {/* Bizarre Stickers Hub Title (Above Navbar) */}
        <h1 className="logo">🎭 Bizarre Stickers Hub</h1>

        {/* Navigation Bar */}
        <nav className="nav-bar">
          <div className="nav-links">
            <button onClick={() => navigate("/")} className="active">Home</button>
            <button onClick={() => navigate("/gallery")}>Gallery</button>
            <button onClick={() => navigate("/upload")}>Upload</button>
            <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
          </div>
        </nav>

        {/* Centered Content */}
        <div className="centered-container">
          <h2 className="sub-title">💻 Most Bizarre Laptop Stickers Seen in College 🎨</h2>
          <p className="description">
            Join the fun! Upload, vote, and explore the wildest, funniest, and most thought-provoking laptop stickers on campus.
          </p>
          <button className="explore-btn" onClick={() => navigate("/gallery")}>Explore Now</button>
        </div>

        {/* Footer */}
        <footer className="footer">🚀 Powered by Student Creativity | © 2025</footer>
      </div>
    </div>
  );
};

export default LandingPage;
