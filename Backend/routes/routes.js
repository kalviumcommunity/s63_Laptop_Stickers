const express = require("express");
const router = express.Router();
const Sticker = require("../models/schema");
const { validateSticker } = require("../middlewares/validation"); // Ensure this file exists

// ✅ GET all stickers
router.get("/stickers", async (req, res) => {
  try {
    const stickers = await Sticker.find();
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
    const { title, imageUrl } = req.body;
    const newSticker = new Sticker({ title, imageUrl });
    await newSticker.save();
    res.status(201).json(newSticker);
  } catch (err) {
    res.status(400).json({ message: "❌ Error saving sticker", error: err.message });
  }
});

// ✅ UPDATE a sticker (With Validation Middleware)
router.put("/stickers/:id", validateSticker, async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    const updatedSticker = await Sticker.findByIdAndUpdate(
      req.params.id,
      { title, imageUrl },
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

module.exports = router;
