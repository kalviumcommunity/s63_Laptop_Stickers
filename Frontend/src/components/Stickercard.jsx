import React, { useEffect, useState } from "react";

const StickersList = () => {
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const response = await fetch("http://localhost:6000/api/stickers");
        if (!response.ok) {
          throw new Error("Failed to fetch stickers");
        }
        const data = await response.json();
        setStickers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStickers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🔥 Bizarre Laptop Stickers</h1>

      {loading && <p className="text-center text-gray-400">Loading stickers...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stickers.map((sticker) => (
          <StickerCard key={sticker._id} {...sticker} />
        ))}
      </div>
    </div>
  );
};

const StickerCard = ({ image, title, uploader, votes }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-3">{title}</h2>
      <p className="text-sm text-gray-400">Uploaded by: <span className="text-blue-400">{uploader}</span></p>
      <p className="text-yellow-400 font-semibold mt-2">🔥 Votes: {votes}</p>
      
      {/* Buttons for interaction */}
      <div className="mt-4 flex justify-center gap-3">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
          👍 Vote
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
          🚩 Report
        </button>
      </div>
    </div>
  );
};

export default StickersList;
