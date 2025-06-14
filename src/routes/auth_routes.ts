import express from "express";
import { Login, Register, verifyOTP } from "../controllers/auth_controller";
import userValidation from "../validations/user_validation";

const authRoutes = express.Router();
authRoutes.post("/register", userValidation, Register);
authRoutes.post("/login", Login);
authRoutes.post("/verify-otp", verifyOTP);

export default authRoutes;
