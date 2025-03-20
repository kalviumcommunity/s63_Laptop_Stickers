const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan"); // ✅ Logs requests
const stickerRoutes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 6001;

// 🔹 Middleware
app.use(cors()); // ✅ Enables CORS for frontend
app.use(express.json()); // ✅ Parses JSON requests
app.use(morgan("dev")); // ✅ Logs requests

// 🔹 Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/stickersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// 🔹 Routes
app.use("/api", stickerRoutes); // ✅ Routes now work under /api

// 🔹 Default route (for testing)
app.get("/", (req, res) => {
  res.send("Welcome to the Sticker Gallery API 🎨✨");
});

// 🔹 404 Route (if no other route matches)
app.use((req, res) => {
  res.status(404).json({ message: "❌ API route not found" });
});

// 🔹 Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
