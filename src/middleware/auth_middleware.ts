import { UserPayload } from '../models/userPayload';
import jwt, { Secret } from "jsonwebtoken";
import responseMessage from "../constant/message";
import { Request, Response, NextFunction } from "express";
require("dotenv").config();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            status: responseMessage.status.error,
            message: responseMessage.user.tokenNotProvide,
        });
        return;
    } else {
        const token = authHeader.split(" ")[1];
        try {
            const secret = process.env.JWT_SECRET;
            const decoded = jwt.verify(token, secret as Secret)  as UserPayload;
            req.user = decoded;
            console.log('req.user', req.user)
            next();
        } catch (error) {
            console.log('error', error);
            res.status(400).json({
                status: responseMessage.status.error,
                message: responseMessage.user.invalidToken,
            });
            return;

        }
    }
}
