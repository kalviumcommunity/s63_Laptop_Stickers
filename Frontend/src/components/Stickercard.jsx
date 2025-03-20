import React from "react";
import { Link } from "react-router-dom";

const StickerCard = ({ sticker, onDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-lg">
      <img src={sticker.imageUrl} alt={sticker.title} className="w-full h-40 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{sticker.title}</h2>
      <div className="mt-2 flex justify-between">
        <Link to={`/update-sticker/${sticker._id}`} className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">Edit</Link>
        <button onClick={() => onDelete(sticker._id)} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default StickerCard;
