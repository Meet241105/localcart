import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./controller/productcontroller.js";
import cartRoutes from "./controller/cartcontroller.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
