import { Request, response, Response } from "express";
import responseMessage from "../constant/message";
import sequelize from "../config/db";
import { Cart, User } from "../models/index";
import { Product } from "../models/index";


export const addCart = async (req: Request, res: Response) => {
    try {
        if (req.user?.role !== "user") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {
            const { id } = req.params;
            await Cart.create({
                product_id: Number(id), createdBy: req.user.userId
            });
            res.status(201).json({
                status: responseMessage.status.success,
                message: responseMessage.Cart.addCart,
            })
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            status: responseMessage.status.error,
            message: responseMessage.server.error,
        });
    }
};

export const cartDetails = async (req: Request, res: Response) => {
    try {
        if (req.user?.role !== "user") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {
            const createdBy = req?.user?.userId;
            // const product = sequelize.models.product;
            const cartProduct = await Cart.findAndCountAll({
                where: { createdBy }, include: [
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

            if (cartProduct) {
                res.status(200).json({
                    status: responseMessage.status.success,
                    message: responseMessage.Cart.getCart,
                    data: cartProduct,
                })
            } else {
                res.status(404).json({
                    status: responseMessage.status.error,
                    message: responseMessage.Cart.notProduct,
                });
                return;
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

export const cartProductDelete = async (req: Request, res: Response) => {
    try {
        if (req.user?.role !== "user") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {
            const { id } = req.params;
            const product = await Cart.findByPk(id);
            if (!product) {
                res.status(404).json({
                    status: responseMessage.status.error,
                    message: responseMessage.Cart.notProduct,
                });
                return;
            } else {
                const cartProduct = await Cart.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json({
                    status: responseMessage.status.success,
                    message: responseMessage.Cart.removeProduct,
                    // data:product,
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