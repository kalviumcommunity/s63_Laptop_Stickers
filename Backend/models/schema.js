const mongoose = require("mongoose");

// Define the Sticker schema
const stickerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  uploader: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

// Create and export the model
const Sticker = mongoose.model("Sticker", stickerSchema);
module.exports = Sticker;
