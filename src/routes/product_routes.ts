import express from "express";
import { createProduct, productDelete, productDetailById, productDetailsAll, productUpdate } from "../controllers/product_controller";
import { verifyToken } from "../middleware/auth_middleware";

const productRoutes = express.Router();
productRoutes.post("/create-product", verifyToken, createProduct);
productRoutes.delete("/delete-product/:id", verifyToken, productDelete);
productRoutes.put("/update-product/:id", verifyToken, productUpdate);
productRoutes.get("/details-product/:id", verifyToken, productDetailById);
productRoutes.get("/details-product", verifyToken, productDetailsAll);

export default productRoutes;