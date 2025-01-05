import pool from "../connect.js";
import multer from "multer";

// Configure multer for image upload
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Add a product to the database
export const addProduct = async (req, res) => {
  const { name, category, price, discount, rating, reviews, description, how_to_use } = req.body;

  try {
    // Validate required fields
    if (!req.files || !req.files.mainImage || req.files.mainImage.length === 0) {
      return res.status(400).json({ message: "Main image is required." });
    }

    // Extract main image buffer
    const mainImageBuffer = req.files.mainImage[0].buffer;

    // Extract additional image buffers (if any)
    const additionalImagesBuffers = req.files.additionalImages
      ? req.files.additionalImages.map((file) => file.buffer)
      : [];

    // Insert product details into the `products` table
    const productResult = await pool.query(
      `INSERT INTO products 
        (name, category, price, image, discount, rating, reviews, description, how_to_use) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING id`,
      [name, category, price, mainImageBuffer, discount, rating, reviews, description, how_to_use]
    );

    const productId = productResult.rows[0].id;

    // Insert additional images into the `product_images` table
    if (additionalImagesBuffers.length > 0) {
      const imageInsertQueries = additionalImagesBuffers.map((buffer) =>
        pool.query(
          "INSERT INTO product_images (product_id, image) VALUES ($1, $2)",
          [productId, buffer]
        )
      );
      await Promise.all(imageInsertQueries);
    }

    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product." });
  }
};
