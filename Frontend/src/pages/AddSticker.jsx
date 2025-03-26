import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddSticker = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // To store selected user ID
  const [users, setUsers] = useState([]); // To store fetched users
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the backend to populate the dropdown
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:6001/api/users");
        const data = await response.json();
        setUsers(data); // Store users in state
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    // Validate if the user is selected
    if (!selectedUser) {
      setError("Please select a user.");
      return;
    }
    try {
      const response = await fetch("http://localhost:6001/api/stickers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, imageUrl, createdBy: selectedUser }), // Include createdBy
      });

      // Debugging: log the response status
      console.log("Response status:", response.status);

      let errorData;
      try {
        // Attempt to parse the response as JSON
        errorData = await response.json();
      } catch (jsonErr) {
        console.error("Error parsing JSON:", jsonErr);
        throw new Error("Unexpected error occurred");
      }

      // If response is not ok, throw an error with the parsed message or a default message
      if (!response.ok) {
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

          <div className="mb-4">
            <label className="block">Select User:</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full p-2 text-black rounded"
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username} {/* Assuming each user has a 'username' field */}
                </option>
              ))}
            </select>
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
