import React, { useEffect, useState } from "react";

const StickerGallery = () => {
  const [stickers, setStickers] = useState([]);
  const [error, setError] = useState(null); // To handle errors during fetching or deleting

  useEffect(() => {
    // Fetch stickers from the backend API
    const fetchStickers = async () => {
      try {
        const response = await fetch("http://localhost:6001/api/stickers");
        if (!response.ok) throw new Error("Failed to fetch stickers");
        const data = await response.json();
        setStickers(data); // Set the fetched stickers to the state
      } catch (err) {
        setError("Failed to load stickers.");
        console.error(err); // Log error if fetching fails
      }
    };
    fetchStickers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the backend
      const response = await fetch(`http://localhost:6001/api/stickers/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete sticker");

      // Remove the deleted sticker from the state
      setStickers((prevStickers) => prevStickers.filter(sticker => sticker._id !== id));
    } catch (error) {
      setError("Error deleting sticker");
      console.error("Error deleting sticker", error); // Log error if deletion fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🔥 Sticker Gallery 🔥</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stickers.map((sticker) => (
          <div key={sticker._id} className="bg-gray-800 p-4 rounded-lg shadow-md relative">
            <img src={sticker.imageUrl} alt={sticker.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{sticker.title}</h3>

            {/* Show the user's name (from the 'created_by' field) */}
            {sticker.created_by && (
              <p className="text-sm text-gray-400 mt-1">Created by: {sticker.created_by.username}</p>
            )}

            <div className="flex justify-between mt-4">
              <a href={`/update-sticker/${sticker._id}`} className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">
                Edit
              </a>
              <button
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(sticker._id)} // Use _id for deletion
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickerGallery;
