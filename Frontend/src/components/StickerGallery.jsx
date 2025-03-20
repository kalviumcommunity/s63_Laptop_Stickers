import React, { useEffect, useState } from "react";

const StickerGallery = () => {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/api/stickers")
      .then((res) => res.json())
      .then((data) => setStickers(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:6001/api/stickers/${id}`, { method: "DELETE" });
      setStickers(stickers.filter((sticker) => sticker.id !== id));
    } catch (error) {
      console.error("Error deleting sticker", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🔥 Sticker Gallery 🔥</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stickers.map((sticker) => (
          <div key={sticker.id} className="bg-gray-800 p-4 rounded-lg shadow-md relative">
            <img src={sticker.imageUrl} alt={sticker.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{sticker.title}</h3>
            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Edit</button>
              <button
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(sticker.id)}
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
