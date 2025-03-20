import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddSticker = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    try {
      const response = await fetch("http://localhost:6001/api/stickers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, imageUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      navigate("/gallery"); // Redirect on success
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add a New Sticker</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Title:</label>
            <input
              type="text"
              className="w-full p-2 text-black rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block">Image URL:</label>
            <input
              type="text"
              className="w-full p-2 text-black rounded"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="bg-green-500 px-4 py-2 rounded">
            Add Sticker
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSticker;
