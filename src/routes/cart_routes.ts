import express from "express";
import { addCart, cartDetails, cartProductDelete } from "../controllers/cart_controller";
import { verifyToken } from "../middleware/auth_middleware";

const cartRoutes = express.Router();
cartRoutes.post("/cart-add/:id",verifyToken,addCart);
cartRoutes.get("/cart-details",verifyToken,cartDetails);
cartRoutes.delete("/cart-delete/:id",verifyToken,cartProductDelete);

export default cartRoutes;