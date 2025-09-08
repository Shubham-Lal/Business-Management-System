import { Request, Response } from "express";
import ProductModel from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const businessId = req.user._id;

        const products = await ProductModel.find({ businessId })
            .select("-businessId -__v")
            .sort({ createdAt: -1 });

        return res.status(200).json({ products });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, category } = req.body ?? {};
        const businessId = req.user._id;

        if (!name || price == null || stock == null || !category) {
            return res.status(400).json({
                message: "Name, price, stock and category are required"
            });
        }

        if (Number(price) < 1) {
            return res.status(400).json({
                message: "Price must be at least 1"
            });
        }

        if (Number(stock) < 0) {
            return res.status(400).json({
                message: "Stock cannot be negative"
            });
        }

        const product = new ProductModel({
            name,
            description,
            price,
            stock,
            category,
            businessId
        });

        await product.save();

        return res.status(201).json({
            message: "Product added",
            product: (({ businessId, ...rest }) => rest)(product.toObject())
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};