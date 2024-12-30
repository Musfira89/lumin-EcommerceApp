import pool from "../connect.js";
import multer from "multer";

// Configure multer for image upload
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Add a product to the database
export const addProduct = async (req, res) => {
  const { name, category, price, discount, rating, reviews } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image is required." });
  }

  const imageBuffer = req.file.buffer;

  try {
    const result = await pool.query(
      "INSERT INTO products (name, category, price, image, discount, rating, reviews) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, category, price, imageBuffer, discount, rating, reviews]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product." });
  }
};
