import React, { useState } from "react";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="landing-page">
      {/* Overlay for readability */}
      <div className="overlay">
        {/* Bizarre Stickers Hub Title (Above Navbar) */}
        <h1 className="logo">🎭 Bizarre Stickers Hub</h1>

        {/* Navigation Bar */}
        <nav className="nav-bar">
          <div className="nav-links">
            <button onClick={() => setActiveTab("home")} className={activeTab === "home" ? "active" : ""}>Home</button>
            <button onClick={() => setActiveTab("gallery")} className={activeTab === "gallery" ? "active" : ""}>Gallery</button>
            <button onClick={() => setActiveTab("upload")} className={activeTab === "upload" ? "active" : ""}>Upload</button>
            <button onClick={() => setActiveTab("leaderboard")} className={activeTab === "leaderboard" ? "active" : ""}>Leaderboard</button>
          </div>
        </nav>

        {/* Centered Content */}
        <div className="centered-container">
          <h2 className="sub-title">💻 Most Bizarre Laptop Stickers Seen in College 🎨</h2>
          <p className="description">
            Join the fun! Upload, vote, and explore the wildest, funniest, and most thought-provoking laptop stickers on campus.
          </p>
          <button className="explore-btn">Explore Now</button>
        </div>

        {/* Footer */}
        <footer className="footer">🚀 Powered by Student Creativity | © 2025</footer>
      </div>
    </div>
  );
};

export default LandingPage;
