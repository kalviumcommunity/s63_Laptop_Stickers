import React from "react";
import StickerCard from "./ StickerCard.jsx"; // Ensure StickerCard is in the same directory



const stickers = [
  { id: 1, image: "https://via.placeholder.com/150", title: "Code Magic", uploader: "Alice", votes: 25 },
  { id: 2, image: "https://via.placeholder.com/150", title: "Bug Hunter", uploader: "Bob", votes: 42 },
  { id: 3, image: "https://via.placeholder.com/150", title: "Sleep Less Code More", uploader: "Charlie", votes: 18 },
];

const StickerGallery = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-6">🔥 Sticker Gallery 🔥</h1>
      <p className="text-center text-gray-300 mb-4">
        Browse and vote for the coolest laptop stickers seen on campus!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stickers.map((sticker) => (
          <StickerCard key={sticker.id} {...sticker} />
        ))}
      </div>
    </div>
  );
};

export default StickerGallery;
