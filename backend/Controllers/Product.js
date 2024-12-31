

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


// // Fetch single product by ID
// export const getProductById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await pool.query(
//       "SELECT * FROM products WHERE id = $1",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Product not found." });
//     }

//     // Convert image to Base64 for the single row
//     const product = result.rows[0];
//     if (product.image) {
//       product.image = product.image.toString("base64");
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     res.status(500).json({ message: "Error fetching product." });
//   }
// };
