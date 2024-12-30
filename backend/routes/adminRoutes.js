import express from "express";
import { addProduct, upload } from "../Controllers/Admin.js";

const router = express.Router();

// Add product route
router.post("/admin/products", upload.single("image"), addProduct);

export default router;
