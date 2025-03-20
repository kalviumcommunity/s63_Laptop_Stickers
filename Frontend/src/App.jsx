import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StickerGallery from "./components/StickerGallery";
import AddSticker from "./pages/AddSticker";
import UpdateSticker from "./pages/UpdateSticker";


const App = () => {
  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex justify-center space-x-4">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/add-sticker">Add Sticker</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<StickerGallery />} />
        <Route path="/add-sticker" element={<AddSticker />} />
        <Route path="/update-sticker/:id" element={<UpdateSticker />} />
        

      </Routes>
    </Router>
  );
};

export default App;
