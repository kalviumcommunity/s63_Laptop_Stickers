import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateSticker = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");  // Error state for handling errors
  const [loading, setLoading] = useState(true);  // Loading state for data fetching

  // Fetch sticker data when component mounts
  useEffect(() => {
    const fetchSticker = async () => {
      try {
        const response = await fetch(`http://localhost:6001/api/stickers/${id}`);
        if (!response.ok) throw new Error("Failed to fetch sticker");
        const data = await response.json();
        setTitle(data.title);
        setImageUrl(data.imageUrl);
      } catch (err) {
        setError("Failed to load sticker details.");
        console.log(err);
      } finally {
        setLoading(false);  // Set loading to false when data is fetched
      }
    };

    fetchSticker();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the inputs before sending
    if (!title.trim() || !imageUrl.trim()) {
      setError("Title and Image URL are required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:6001/api/stickers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, imageUrl }),
      });

      if (!response.ok) throw new Error("Failed to update sticker");

      // Navigate to the gallery after successful update
      navigate("/gallery");
    } catch (err) {
      setError("Error updating sticker.");
      console.log(err);
    }
  };

  // Show loading indicator while fetching data
  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Update Sticker</h2>
        
        {/* Error message if any */}
        {error && <p className="text-red-500 mb-2">{error}</p>}

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
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateSticker;
