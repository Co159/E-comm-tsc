import { Request, Response } from "express";
import { Product } from "../models/index";
import responseMessage from "../constant/message";

export const createProduct = async (req: Request, res: Response) => {
    // console.log('req', req)
    try {
        console.log("Role:....", req?.user?.role);
        if (req.user?.role !== "admin") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {
            const { name, price, type, rating } = req.body;

            await Product.create({ name, price, type, rating, createdby: req.user.userId, });
            res.status(201).json({
                status: responseMessage.status.success,
                message: responseMessage.Product.createProduct,
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

export const productUpdate = async (req: Request, res: Response) => {
    try {
        if (req.user?.role !== "admin") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {
            const { id } = req.params;
            const { name, price, type, rating } = req.body;
            console.log('req.body', req.body)

            const product = await Product.findByPk(id);
            console.log('product', product)
            if (!product) {
                res.status(404).json({
                    status: responseMessage.status.error,
                    message: responseMessage.Product.notFound,
                });
                return;
            } else {
                await product.update({
                    name: name || product.name,
                    price: price || product.price,
                    type: type || product.type,
                    rating: rating || product.rating,
                });

                res.status(200).json({
                    status: responseMessage.status.success,
                    message: responseMessage.Product.updateProduct,
                });
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

export const productDelete = async (req: Request, res: Response) => {
    try {
        if (req.user?.role !== "admin") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (!product) {
                res.status(404).json({
                    status: responseMessage.status.error,
                    message: responseMessage.Product.notFound,
                });
                return;
            } else {
                const product = await Product.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json({
                    status: responseMessage.status.success,
                    message: responseMessage.Product.deleteProduct,
                })
            }
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            status: responseMessage.status.error,
            message: responseMessage.server.error,
        });
    }
};

export const productDetailsAll = async (req: Request, res: Response) => {
    try {
        if (req.user?.role !== "admin" && req.user?.role !== "user") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {
            const product = await Product.findAndCountAll();
            if (product) {
                res.status(200).json({
                    status: responseMessage.status.success,
                    message: responseMessage.Product.getProduct,
                    data: product,
                })
            } else {
                res.status(404).json({
                    status: responseMessage.status.error,
                    message: responseMessage.Product.notFound,
                });
                return;
            }
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            status: responseMessage.status.error,
            message: responseMessage.server.error,
        });
    }
};
export const productDetailById = async (req: Request, res: Response) => {
    try {
        if (req.user?.role !== "admin" && req.user?.role !== "user") {
            res.status(401).json({
                status: responseMessage.status.error,
                message: responseMessage.user.notAccess,
            });
            return;
        } else {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (product) {
                res.status(200).json({
                    status: responseMessage.status.success,
                    message: responseMessage.Product.getProduct,
                    data: product,
                })
            } else {
                res.status(404).json({
                    status: responseMessage.status.error,
                    message: responseMessage.Product.notFound,
                });
                return;
            }
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            status: responseMessage.status.error,
            message: responseMessage.server.error,
        });
    }
};