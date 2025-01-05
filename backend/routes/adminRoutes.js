import express from "express";
import { addProduct, upload } from "../controllers/admin.js";

const router = express.Router();

// Route to add a new product
router.post(
  "/admin/products",
  upload.fields([
    { name: "mainImage", maxCount: 1 }, // Main image
    { name: "additionalImages", maxCount: 5 }, // Up to 5 additional images
  ]),
  addProduct
);

export default router;
