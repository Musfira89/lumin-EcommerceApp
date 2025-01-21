import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import pool from "./connect.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api", productRoutes);
app.use("/api", adminRoutes);
app.use("/api/payments", paymentRoutes);


app.listen(process.env.PORT || 8082, () => {
  console.log(`Server running on port ${process.env.PORT || 8082}`);
});
