

import pool from "../connect.js";

// Fetch all products by category
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE category = $1",
      [category]
    );

    // Convert image data to base64
    const products = result.rows.map((product) => {
      if (product.image) {
        product.image = product.image.toString("base64");
      }
      return product;
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getProductDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch product details
    const productResult = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const product = productResult.rows[0];

    // Convert the main image to base64
    if (product.image) {
      product.image = product.image.toString("base64");
    }

    // Fetch additional images from product_images table
    const imagesResult = await pool.query(
      "SELECT image FROM product_images WHERE product_id = $1",
      [id]
    );
    const additionalImages = imagesResult.rows.map((row) => row.image.toString("base64"));

    // Include additional images in the response
    product.additionalImages = additionalImages;

    res.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
