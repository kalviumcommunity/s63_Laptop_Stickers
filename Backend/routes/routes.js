const express = require("express");
const router = express.Router();
const Sticker = require("../models/schema");
const { validateSticker } = require("../middlewares/validation");
const User = require("../models/User"); // Assuming you have a User model for fetching users

// ✅ GET all stickers with user information (created_by)
router.get("/stickers", async (req, res) => {
  try {
    const stickers = await Sticker.find().populate('created_by', 'username'); // Populate created_by to get user details
    if (stickers.length === 0) {
      return res.status(404).json({ message: "❌ No stickers found" });
    }
    res.status(200).json(stickers);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching stickers", error: err.message });
  }
});

// ✅ POST a new sticker (With Validation Middleware)
router.post("/stickers", validateSticker, async (req, res) => {
  try {
    const { title, imageUrl, createdBy } = req.body; // Include 'createdBy' to associate the sticker with a user
    if (!createdBy) {
      return res.status(400).json({ message: "❌ createdBy is required" });
    }

    // Check if the user exists
    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({ message: "❌ User not found" });
    }

    const newSticker = new Sticker({ title, imageUrl, created_by: createdBy });
    await newSticker.save();
    res.status(201).json(newSticker);
  } catch (err) {
    res.status(400).json({ message: "❌ Error saving sticker", error: err.message });
  }
});

// ✅ UPDATE a sticker (With Validation Middleware)
router.put("/stickers/:id", validateSticker, async (req, res) => {
  try {
    const { title, imageUrl, createdBy } = req.body; // Include 'createdBy' if you're updating the user reference
    const updatedSticker = await Sticker.findByIdAndUpdate(
      req.params.id,
      { title, imageUrl, created_by: createdBy },
      { new: true, runValidators: true }
    );

    if (!updatedSticker) {
      return res.status(404).json({ message: "❌ Sticker not found" });
    }

    res.status(200).json(updatedSticker);
  } catch (err) {
    res.status(400).json({ message: "❌ Error updating sticker", error: err.message });
  }
});

// ✅ DELETE a sticker
router.delete("/stickers/:id", async (req, res) => {
  try {
    const deletedSticker = await Sticker.findByIdAndDelete(req.params.id);
    if (!deletedSticker) {
      return res.status(404).json({ message: "❌ Sticker not found" });
    }
    res.status(200).json({ message: "✅ Sticker deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error deleting sticker", error: err.message });
  }
});

// ✅ GET all users for dropdown (to assign created_by)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();  // Get all users
    if (users.length === 0) {
      return res.status(404).json({ message: "❌ No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching users", error: err.message });
  }
});

// ✅ POST a new user (to create users)
router.post("/users", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "❌ Please provide all required fields (username, email, password)." });
    }

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "❌ Username or email already exists" });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json(newUser);  // Respond with the newly created user
  } catch (err) {
    res.status(500).json({ message: "❌ Error creating user", error: err.message });
  }
});

module.exports = router;
