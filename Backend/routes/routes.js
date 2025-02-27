const express = require("express");
const router = express.Router();
const Sticker = require("../models/schema"); // Ensure the correct model path


// CREATE: Add a new sticker
router.post("/stickers", async (req, res) => {
  try {
    const newSticker = new Sticker(req.body);
    await newSticker.save();
    res.status(201).json({ message: "Sticker added successfully", sticker: newSticker });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ: Get all stickers
router.get("/stickers", async (req, res) => {
  try {
    const stickers = await Sticker.find();
    res.status(200).json({ message: "Stickers retrieved successfully", stickers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get a single sticker by ID
router.get("/stickers/:id", async (req, res) => {
  try {
    const sticker = await Sticker.findById(req.params.id);
    if (!sticker) {
      return res.status(404).json({ message: "Sticker not found" });
    }
    res.status(200).json({ message: "Sticker retrieved successfully", sticker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Update a sticker by ID
router.put("/stickers/:id", async (req, res) => {
  try {
    const updatedSticker = await Sticker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSticker) {
      return res.status(404).json({ message: "Sticker not found" });
    }
    res.status(200).json({ message: "Sticker updated successfully", sticker: updatedSticker });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a sticker by ID
router.delete("/stickers/:id", async (req, res) => {
  try {
    const deletedSticker = await Sticker.findByIdAndDelete(req.params.id);
    if (!deletedSticker) {
      return res.status(404).json({ message: "Sticker not found" });
    }
    res.status(200).json({ message: "Sticker deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
