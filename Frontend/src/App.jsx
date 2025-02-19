import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GalleryPage from "./pages/GalleryPage"; // ✅ Correct Import

const App = () => {
  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex justify-center space-x-4">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/gallery" className="hover:text-yellow-400">Gallery</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
