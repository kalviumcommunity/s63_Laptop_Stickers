import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StickerGallery from "./components/StickerGallery";
import AddSticker from "./pages/AddSticker";
import UpdateSticker from "./pages/UpdateSticker";
import LoginPage from "./pages/Login"; // ✅ Correct
import axios from "axios"; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated (based on stored cookie)
  useEffect(() => {
    axios.get("http://localhost:6001/auth/profile", { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogout = () => {
    axios.post("http://localhost:6001/auth/logout", {}, { withCredentials: true })
      .then(() => setIsAuthenticated(false))
      .catch((err) => console.error(err));
  };

  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex justify-center space-x-4">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/add-sticker">Add Sticker</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="text-red-500">Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<StickerGallery />} />
        <Route path="/add-sticker" element={<AddSticker />} />
        <Route path="/update-sticker/:id" element={<UpdateSticker />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;
