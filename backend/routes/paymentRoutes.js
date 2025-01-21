import express from "express";
import { createPaymentIntent } from "../Controllers/paymentController.js";

const router = express.Router();

// Payment route
router.post("/checkout", createPaymentIntent);

export default router;
