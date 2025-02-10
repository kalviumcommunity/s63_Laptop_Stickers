const mongoose = require("mongoose");

const stickerSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true, // Image URL of the sticker
  },
  caption: {
    type: String,
    required: true, // Caption or description of the sticker
  },
  tags: {
    type: [String], // Array of tags, e.g., ["funny", "techie"]
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for when the sticker is created
  },
});

const Sticker = mongoose.model("Sticker", stickerSchema);

module.exports = Sticker;
