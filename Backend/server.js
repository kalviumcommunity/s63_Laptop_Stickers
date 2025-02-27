const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // Import CORS
const connectDatabase = require("./database");
const stickerRoutes = require("./routes/routes");  // Import the routes file

const app = express();
connectDatabase();

// Middleware
app.use(express.json());  // Parse JSON
app.use(cors());  // Enable CORS for frontend-backend connection

// Use the routes from the routes.js file
app.use("/api", stickerRoutes);  // Prefix all routes in routes.js with /api

// **Ping Route for Health Check**
app.get("/ping", (req, res) => {
  res.send("pong");
});

// **Home Route with Database Connection Status**
app.get("/", (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: "Welcome to the API", db_status: status });
});

// **Global Error Handling Middleware**
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
