const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // Ensure the username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure the email is unique
  },
  password: {
    type: String,
    required: true,  // You may want to hash the password in a real application
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
