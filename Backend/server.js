const express = require("express");
const mongoose = require("mongoose");
const connectDatabase = require("./database");
const stickerRoutes = require("./routes/routes");  // Import the routes file

const app = express();
connectDatabase();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes from the routes.js file
app.use("/api", stickerRoutes);  // This will prefix all routes in routes.js with /api

app.get("/ping", (req, res) => {
  try {
    res.send("pong");
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

// **Add Home Route with DB Status**
app.get("/", (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: "Welcome to the API", db_status: status });
});

app.listen(6000, () => {
  console.log(`Server is running on port http://localhost:6000`);
});
