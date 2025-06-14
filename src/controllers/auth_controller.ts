import { DataTypes } from 'sequelize';
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import nodemailer from "nodemailer";
require("dotenv").config();
import responseMessage from '../constant/message';
import { User } from "../models/index";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    }
})

export const Register = async (req: Request, res: Response) => {
    console.log('req.body', req.body)
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        res.status(404).json({
            status: responseMessage.status.error,
            message: responseMessage.user.userExists,
        });
        return;
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                email, password: hashedPassword,

            });
            res.status(201).json({
                status: responseMessage.status.success,
                message: responseMessage.user.registerSuccess,
            })
        } catch (error) {
            console.log('error', error)
            res.status(500).json({
                status: responseMessage.status.error,
                message: responseMessage.server.error,
            })
        }
    }
};


export const Login = async (req: Request, res: Response) => {

    try {
        console.log('req.body', req.body)
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        console.log('user', user?.dataValues?.password)

        if (!user) {
            res.status(404).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notFound,
            });
            return;
        } else {
            const isMatch = await bcrypt.compare(password, user?.dataValues?.password);
            console.log('isMatch', isMatch)
            if (!isMatch) {
                res.status(401).json({
                    status: responseMessage.status.error,
                    message: responseMessage.user.invalidCredentials,
                });
                return;
            } else {
                const otp = Math.floor(100000 + Math.random() * 900000).toString();

                const otpExpiration = new Date(Date.now() + 10 * 60 * 60 * 1000);

                await user.update({ otp: otp, otpExpireAt: otpExpiration });

                console.log(`OTP for ${email}: ${otp}`);

                const mailOptions = {
                    from: process.env.EMAIL_USERNAME,
                    to: email,
                    subject: "Your Login OTP",
                    text: `Your OTP is : ${otp}`,
                }

                const mailsend = await transporter.sendMail(mailOptions);

                if (mailsend) {
                    res.status(200).json({
                        status: responseMessage.status.success,
                        message: responseMessage.user.loginSuccess,
                    })
                }
            }
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            status: responseMessage.status.error,
            message: responseMessage.server.error,
        })
    }
};

export const verifyOTP = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notFound,
            });
            return;
        } else {

            console.log('user?.otp', user?.dataValues?.otp)
            console.log('otp', otp)
            if (user?.dataValues?.otp == otp) {
                await user.update({ isverified: true, otp: null, otpExpireAt: null });

                const payload = {
                    userId: user?.dataValues?.id,
                    email: user?.dataValues?.email,
                    role: user?.dataValues?.role,
                };

                const secret = process.env.JWT_SECRET || "ecommghtyudhf";
                // const expiresIn = process.env.JWT_EXPIRES_IN || "12h"
                const token = jwt.sign(
                    payload,
                    secret,

                    {
                        expiresIn: '12h',
                    }
                );

                res.status(200).json({
                    status: responseMessage.status.success,
                    message: responseMessage.user.verifyOTP,
                    token,
                })
            } else {
                res.status(400).json({
                    status: responseMessage.status.error,
                    message: responseMessage.user.invalidOTP,
                });
                return;
            }
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            status: responseMessage.status.error,
            message: responseMessage.server.error,
        })

    }
};






