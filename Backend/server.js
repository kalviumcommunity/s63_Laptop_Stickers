require("dotenv").config(); // ✅ Load environment variables FIRST

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet"); // ✅ Adds security headers
const bodyParser = require("body-parser");
const stickerRoutes = require("./routes/routes");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 6001;

// 🔹 MongoDB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/stickersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// 🔹 Middleware
app.use(cors({ 
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // ✅ Allow frontend requests
    credentials: true, // ✅ Enable cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); // ✅ Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // ✅ Parse URL-encoded bodies
app.use(cookieParser()); // ✅ Enable cookie parsing
app.use(morgan("dev")); // ✅ Log API requests
app.use(helmet()); // ✅ Security headers

// 🔹 Routes
app.use("/api", stickerRoutes); // ✅ Sticker routes
app.use("/api/auth", authRoutes);   // ✅ Authentication routes

// 🔹 Default route (for testing)
app.get("/", (req, res) => {
  res.send("🎨✨ Welcome to the Sticker Gallery API ✨🎨");
});

// 🔹 404 Route (if no other route matches)
app.use((req, res) => {
  res.status(404).json({ message: "❌ API route not found" });
});

// 🔹 Handle Uncaught Errors (Prevents Server Crash)
process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
  process.exit(1); // Exit to avoid unstable state
});

// 🔹 Start Server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
