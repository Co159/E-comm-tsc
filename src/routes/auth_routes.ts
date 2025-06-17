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
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Admin User
 *                     email:
 *                       type: string
 *                       example: admin@gmail.com
 *       401:
 *         description: Invalid credentials
 *        
 *       404:
 *         description: User not registered
 */


authRoutes.post("/login", Login);
authRoutes.post("/verify-otp", verifyOTP);

export default authRoutes;
