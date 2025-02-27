import React, { useState, useEffect } from "react";
import StickerCard from "./Stickercard"; // ✅ Fixed Import Path

const StickerGallery = () => {
  const [stickers, setStickers] = useState([]);  // State to store fetched stickers
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null);     // State for handling errors

  useEffect(() => {
    // Fetch stickers from the backend API
    const fetchStickers = async () => {
      try {
        const response = await fetch("http://localhost:6000/api/stickers");
        if (!response.ok) {
          throw new Error("Failed to fetch stickers");
        }
        const data = await response.json();
        setStickers(data); // Update state with fetched stickers
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStickers();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-6">🔥 Sticker Gallery 🔥</h1>
      <p className="text-center text-gray-300 mb-4">
        Browse and vote for the coolest laptop stickers seen on campus!
      </p>

      {/* Show Loading State */}
      {loading && <p className="text-center text-yellow-400">Loading Stickers...</p>}

      {/* Show Error Message if API Call Fails */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display Stickers if Data is Available */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stickers.length > 0 ? (
            stickers.map((sticker) => <StickerCard key={sticker.id} {...sticker} />)
          ) : (
            <p className="text-center text-gray-400 col-span-3">No stickers found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StickerGallery;
