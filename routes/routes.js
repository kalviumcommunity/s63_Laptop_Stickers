const express = require("express");
const router = express.Router();
const Sticker = require("../models/schema");  // Import the Sticker model

// CREATE: Add a new sticker
router.post("/stickers", async (req, res) => {
  try {
    const newSticker = new Sticker(req.body); // Use the data from the request body
    await newSticker.save();
    res.status(201).json(newSticker);  // Send back the created sticker
  } catch (err) {
    res.status(400).json({ error: err.message });  // Error handling
  }
});

// READ: Get all stickers
router.get("/stickers", async (req, res) => {
  try {
    const stickers = await Sticker.find();  // Fetch all stickers
    res.status(200).json(stickers);  // Send back the list of stickers
  } catch (err) {
    res.status(500).json({ error: err.message });  // Error handling
  }
});

// READ: Get a single sticker by ID
router.get("/stickers/:id", async (req, res) => {
  try {
    const sticker = await Sticker.findById(req.params.id);  // Fetch a sticker by ID
    if (!sticker) {
      return res.status(404).json({ message: "Sticker not found" });
    }
    res.status(200).json(sticker);  // Send back the sticker data
  } catch (err) {
    res.status(500).json({ error: err.message });  // Error handling
  }
});

// UPDATE: Update a sticker by ID
router.put("/stickers/:id", async (req, res) => {
  try {
    const updatedSticker = await Sticker.findByIdAndUpdate(
      req.params.id,
      req.body,  // Update sticker with the new data from the body
      { new: true }  // Return the updated sticker
    );
    if (!updatedSticker) {
      return res.status(404).json({ message: "Sticker not found" });
    }
    res.status(200).json(updatedSticker);  // Send back the updated sticker
  } catch (err) {
    res.status(400).json({ error: err.message });  // Error handling
  }
});

// DELETE: Delete a sticker by ID
router.delete("/stickers/:id", async (req, res) => {
  try {
    const deletedSticker = await Sticker.findByIdAndDelete(req.params.id);  // Delete sticker by ID
    if (!deletedSticker) {
      return res.status(404).json({ message: "Sticker not found" });
    }
    res.status(200).json({ message: "Sticker deleted successfully" });  // Confirmation message
  } catch (err) {
    res.status(500).json({ error: err.message });  // Error handling
  }
});

module.exports = router;
