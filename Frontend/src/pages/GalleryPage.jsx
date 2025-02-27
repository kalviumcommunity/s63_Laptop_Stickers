import React from "react";
import StickerGallery from "../components/StickerGallery"; // Ensure correct import path

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-yellow-400">
          🎨 Welcome to the Sticker Gallery! 🎨
        </h1>
        <p className="text-lg text-gray-300 mt-3">
          Explore the wildest, funniest, and most thought-provoking laptop stickers spotted on campus.  
          Cast your votes, share your favorites, and let the creativity shine! 🚀🔥
        </p>
      </div>

      {/* Render Sticker Gallery */}
      <div className="max-w-6xl mx-auto">
        <StickerGallery />
      </div>
    </div>
  );
};

export default GalleryPage;
