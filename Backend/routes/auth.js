const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Middleware for handling cookies
const cookieParser = require("cookie-parser");

router.use(cookieParser());

// Secret key (Store in .env)
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide all required fields" 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: "Passwords do not match" 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 6 characters" 
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ 
        success: false,
        message: "Email already in use" 
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ 
        success: false,
        message: "Username already taken" 
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store token in HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return success without sending password
    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      success: false,
      message: "Registration failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide email and password" 
      });
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store token in HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return success without sending password
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        stickersUploaded: user.stickersUploaded,
        votesReceived: user.votesReceived,
        badge: user.badge
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Login failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ 
    success: true,
    message: "Logged out successfully" 
  });
});

// Get Current User Route
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Not authenticated" 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get user data
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Return user data
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        bio: user.bio,
        stickersUploaded: user.stickersUploaded,
        votesReceived: user.votesReceived,
        badge: user.badge,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: "Invalid token" 
      });
    }
    
    console.error("Auth error:", error);
    res.status(500).json({ 
      success: false,
      message: "Authentication failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// Demo Login Route (for testing purposes)
router.post("/demo-login", async (req, res) => {
  try {
    // Check if demo user exists, if not create one
    let demoUser = await User.findOne({ email: "demo@example.com" });
    
    if (!demoUser) {
      // Create demo user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("demo123", salt);
      
      demoUser = await User.create({
        username: "demouser",
        email: "demo@example.com",
        password: hashedPassword,
        role: "user",
        profilePicture: "",
        bio: "This is a demo account for testing purposes",
        stickersUploaded: 5,
        votesReceived: 42,
        badge: "Sticker Explorer"
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: demoUser._id, username: demoUser.username, role: demoUser.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store token in HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // Return success
    res.status(200).json({
      success: true,
      message: "Demo login successful",
      user: {
        id: demoUser._id,
        username: demoUser.username,
        email: demoUser.email,
        role: demoUser.role,
        profilePicture: demoUser.profilePicture,
        stickersUploaded: demoUser.stickersUploaded,
        votesReceived: demoUser.votesReceived,
        badge: demoUser.badge
      }
    });
  } catch (error) {
    console.error("Demo login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Demo login failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

module.exports = router;
