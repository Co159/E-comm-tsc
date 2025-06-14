import { Request, Response } from "express";
import { Order, Product, User } from "../models/index";
import responseMessage from "../constant/message";
import { literal, where } from "sequelize";

export const createOrder = async (req: Request, res: Response) => {
    try {
        if (req.user?.role !== "user") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {
            const { product_id, quantity } = req.body;
            await Order.create({ product_id, quantity, createdBy: req?.user?.userId });
            res.status(201).json({
                status: responseMessage.status.success,
                message: responseMessage.Order.addOrder,
            })
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            status: responseMessage.status.error,
            message: responseMessage.server.error,
        });
    }
};

export const OrderDetails = async (req: Request, res: Response) => {
    try {
        if (req.user?.role !== "user") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {
            const createdBy = req?.user?.userId;

            const order = await Order.findAndCountAll({
                where: { createdBy }, attributes: {
                    include: [
                        [literal('"Order"."quantity" * "product_detail"."price"'), 'amount']
                    ]
                }, include: [
                    {
                        model: Product,
                        as: 'product_detail',
                        attributes: ['id', 'name', 'price', 'rating', 'type'],
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'email'],
                    },

                ],
            });
            if (!order) {
                res.status(404).json({
                    status: responseMessage.status.error,
                    message: responseMessage.Cart.notProduct,
                });
                return;
            } else {
                res.status(200).json({
                    status: responseMessage.status.success,
                    message: responseMessage.Cart.getCart,
                    data: order,
                })
            }
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            status: responseMessage.status.error,
            message: responseMessage.server.error,
        });
    }
};

export const allOrderDetails = async (req: Request, res: Response) => {
    try {
        if (req?.user?.role !== "admin") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {

            const order = await Order.findAndCountAll({
                attributes: {
                    include: [
                        [literal('"Order"."quantity" * "product_detail"."price"'), 'amount']
                    ]
                },
                include: [
                    {
                        model: Product,
                        as: 'product_detail',
                        attributes: ['id', 'name', 'price', 'rating', 'type'],
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'email'],

                    }
                ]
            });
            if (!order) {
                res.status(404).json({
                    status: responseMessage.status.error,
                    message: responseMessage.Cart.notProduct,
                });
                return;
            } else {
                res.status(200).json({
                    status: responseMessage.status.success,
                    message: responseMessage.Cart.getCart,
                    data: order,
                })
            }
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            status: responseMessage.status.error,
            message: responseMessage.server.error,
        });
    }
};