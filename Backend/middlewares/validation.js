// middlewares/validation.js

const validateSticker = (req, res, next) => {
  const { title, imageUrl } = req.body;

  // Validate Title
  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return res.status(400).json({ message: "❌ Title must be at least 3 characters long." });
  }

  // Validate Image URL (must be a valid URL ending in jpg, jpeg, png, or gif)
  const imageRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i;
  if (!imageUrl || !imageRegex.test(imageUrl)) {
    return res.status(400).json({ message: "❌ A valid image URL (jpg, jpeg, png, gif) is required." });
  }

  next(); // ✅ Proceed to the next middleware if validation passes
};

module.exports = { validateSticker };
