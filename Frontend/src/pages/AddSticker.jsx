import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddSticker = () => {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 🔹 Fetch Users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:6001/api/users", {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error(`Failed to fetch users: ${response.status}`);

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("❌ Error fetching users:", error);
                setError("Failed to load users. Please try again.");
            }
        };

        fetchUsers();
    }, []);

    // 🔹 Handle Sticker Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !imageUrl || !selectedUser) {
            setError("❌ All fields are required.");
            return;
        }

        try {
            console.log("🛠 Sending data:", { title, imageUrl, createdBy: selectedUser });

            const response = await fetch("http://localhost:6001/api/stickers", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    createdBy: selectedUser, // Ensure this is a valid ObjectId
                }),
            });

            const responseData = await response.json(); // Get response body

            if (!response.ok) {
                console.error("❌ Server Error:", responseData);
                throw new Error(responseData.message || "Failed to add sticker");
            }

            console.log("✅ Sticker added successfully:", responseData);
            navigate("/stickers");
        } catch (error) {
            console.error("❌ Error adding sticker:", error);
            setError(error.message || "Failed to add sticker. Please try again.");
        }
    };

    return (
        <div>
            <h2>Add New Sticker</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Sticker Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />

                {/* 🔹 User Dropdown */}
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    required
                >
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.username}
                        </option>
                    ))}
                </select>

                <button type="submit">Add Sticker</button>
            </form>
        </div>
    );
};

export default AddSticker;
