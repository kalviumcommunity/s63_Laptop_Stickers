const mongoose = require("mongoose");

const StickerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Sticker", StickerSchema);
