import express from "express";
import authRoutes from "./auth_routes";
import productRoutes from "./product_routes";
import cartRoutes from "./cart_routes";
import orderRoutes from "./order_routes";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);

export default router;