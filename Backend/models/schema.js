const mongoose = require("mongoose");

const stickerSchema = new mongoose.Schema({
  title: { // Added 'title' as per your second schema
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },



  
  caption: {
    type: String,
   
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  created_by: {  // New field for tracking the user who created the sticker
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a 'User' model
    required: true,
  }
});

const Sticker = mongoose.model("Sticker", stickerSchema);

module.exports = Sticker;
