import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateSticker = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`http://localhost:6001/api/stickers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setImageUrl(data.imageUrl);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:6001/api/stickers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, imageUrl }),
    })
      .then(() => navigate("/gallery"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Update Sticker</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Update</button>
      </form>
    </div>
  );
};

export default UpdateSticker;
