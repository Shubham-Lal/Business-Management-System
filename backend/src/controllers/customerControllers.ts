import { Request, Response } from "express";
import CustomerModel from "../models/Customer";

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const businessId = req.user._id;

        const customers = await CustomerModel.find({ businessId })
            .select("-_id -businessId -__v")
            .sort({ createdAt: -1 });

        return res.status(200).json({ customers });
    } 
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { name, phone, email, address } = req.body ?? {};
        const businessId = req.user._id;

        if (!name || !phone || !email) {
            return res.status(400).json({
                message: "Name, phone, and email are required"
            });
        }

        const existingCustomer = await CustomerModel.findOne({ email, businessId });
        if (existingCustomer) {
            return res.status(409).json({
                message: "Customer with this email already exists for your business"
            });
        }

        const customer = new CustomerModel({
            name,
            phone,
            email,
            address,
            businessId,
        });

        await customer.save();

        return res.status(201).json({
            message: "Customer created successfully",
            customer: (({ _id, businessId, ...rest }) => rest)(customer.toObject())
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};