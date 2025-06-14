import express from "express";
import { verifyToken } from "../middleware/auth_middleware";
import { allOrderDetails, createOrder, OrderDetails } from "../controllers/order_controller";

const orderRoutes = express.Router();
orderRoutes.post("/order-add",verifyToken,createOrder);
orderRoutes.get("/order-details",verifyToken,OrderDetails);
orderRoutes.get("/order-details-all",verifyToken,allOrderDetails);

export default orderRoutes;