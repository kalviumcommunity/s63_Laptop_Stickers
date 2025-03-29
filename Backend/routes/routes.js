const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Sticker = require("../models/schema");
const { validateSticker } = require("../middlewares/validation");
const User = require("../models/User"); // User model

// ✅ GET all stickers with user information
router.get("/stickers", async (req, res) => {
  try {
    const stickers = await Sticker.find().populate('created_by', 'username');
    res.status(200).json(stickers);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching stickers", error: err.message });
  }
});

// ✅ POST a new sticker
router.post("/stickers", validateSticker, async (req, res) => {
  try {
    const { title, imageUrl, createdBy } = req.body;
    if (!createdBy) return res.status(400).json({ message: "❌ createdBy is required" });

    const user = await User.findById(createdBy);
    if (!user) return res.status(404).json({ message: "❌ User not found" });

    const newSticker = new Sticker({ title, imageUrl, created_by: createdBy });
    await newSticker.save();
    res.status(201).json(newSticker);
  } catch (err) {
    res.status(400).json({ message: "❌ Error saving sticker", error: err.message });
  }
});

// ✅ UPDATE a sticker
router.put("/stickers/:id", validateSticker, async (req, res) => {
  try {
    const { title, imageUrl, createdBy } = req.body;
    const updatedSticker = await Sticker.findByIdAndUpdate(
      req.params.id,
      { title, imageUrl, created_by: createdBy },
      { new: true, runValidators: true }
    );

    if (!updatedSticker) return res.status(404).json({ message: "❌ Sticker not found" });
    res.status(200).json(updatedSticker);
  } catch (err) {
    res.status(400).json({ message: "❌ Error updating sticker", error: err.message });
  }
});

// ✅ DELETE a sticker
router.delete("/stickers/:id", async (req, res) => {
  try {
    const deletedSticker = await Sticker.findByIdAndDelete(req.params.id);
    if (!deletedSticker) return res.status(404).json({ message: "❌ Sticker not found" });

    res.status(200).json({ message: "✅ Sticker deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error deleting sticker", error: err.message });
  }
});

// ✅ GET all users for dropdown (FIXED)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching users", error: err.message });
  }
});

// ✅ POST a new user (Fixed Password Hashing)
router.post("/users", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "❌ Please provide all required fields (username, email, password)." });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ message: "❌ Username or email already exists" });

    // 🔹 Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "✅ User created successfully", user: { username, email } });
  } catch (err) {
    res.status(500).json({ message: "❌ Error creating user", error: err.message });
  }
});

module.exports = router;
