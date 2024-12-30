import express from "express";
import { getProductsByCategory,getProductById,} from "../Controllers/Product.js";

const router = express.Router();

// Route to get products by category
router.get("/products/:category", getProductsByCategory);

// Route to get product by ID
router.get("/products/detail/:id", getProductById);

export default router;
