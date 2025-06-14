import express from "express";
import { Login, Register, verifyOTP } from "../controllers/auth_controller";
import userValidation from "../validations/user_validation";

const authRoutes = express.Router();



authRoutes.post("/register", userValidation, Register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       404:
 *          description: User not register 
 * 
 */

authRoutes.post("/login", Login);
authRoutes.post("/verify-otp", verifyOTP);

export default authRoutes;
