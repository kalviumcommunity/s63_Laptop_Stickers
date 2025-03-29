import React, { useEffect, useState } from "react";

const StickerGallery = () => {
  const [stickers, setStickers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Show loading state

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        console.log("Fetching stickers from API...");
        const response = await fetch("http://localhost:6001/api/stickers", {
          credentials: "include", // Important if using authentication
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch stickers: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Stickers fetched successfully:", data);

        if (!data.length) {
          setError("No stickers found.");
          return;
        }

        setStickers(data);
      } catch (err) {
        console.error("Error fetching stickers:", err);
        setError(err.message || "Failed to load stickers.");
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchStickers();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(`Deleting sticker with ID: ${id}`);
      const response = await fetch(`http://localhost:6001/api/stickers/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete sticker: ${response.status} ${response.statusText}`);
      }

      console.log(`Sticker with ID ${id} deleted successfully.`);
      setStickers((prev) => prev.filter((sticker) => sticker._id !== id));
    } catch (error) {
      console.error("Error deleting sticker:", error);
      setError(error.message || "Error deleting sticker.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🔥 Sticker Gallery 🔥</h1>

      {loading && <p className="text-gray-400 text-center">Loading stickers...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stickers.length > 0 ? (
          stickers.map((sticker) => (
            <div key={sticker._id} className="bg-gray-800 p-4 rounded-lg shadow-md relative">
              <img src={sticker.imageUrl} alt={sticker.title} className="w-full h-48 object-cover rounded" />
              <h3 className="text-lg font-semibold mt-2">{sticker.title}</h3>

              {sticker.created_by && (
                <p className="text-sm text-gray-400 mt-1">Created by: {sticker.created_by.username}</p>
              )}

              <div className="flex justify-between mt-4">
                <a href={`/update-sticker/${sticker._id}`} className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">
                  Edit
                </a>
                <button
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(sticker._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-400 text-center">No stickers available.</p>
        )}
      </div>
    </div>
  );
};

export default StickerGallery;
