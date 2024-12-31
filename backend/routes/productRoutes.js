import express from "express";
import { getProductsByCategory,getProductDetails} from "../Controllers/Product.js";

const router = express.Router();

// Route to get products by category
router.get("/products/:category", getProductsByCategory);

router.get("/products/details/:id", getProductDetails);

export default router;
