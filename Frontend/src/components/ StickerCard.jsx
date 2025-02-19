import React from "react";

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

export default StickerCard;
