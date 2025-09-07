import { Request, Response } from "express";
import CustomerModel from "../models/Customer";

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const businessId = req.user._id;

        const customers = await CustomerModel.find({ businessId })
            .select("-businessId -__v")
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

        const existingCustomer = await CustomerModel.findOne({ email, phone, businessId });
        if (existingCustomer) {
            return res.status(409).json({
                message: "Customer with this email & phone already exists for your business"
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
            customer: (({ businessId, ...rest }) => rest)(customer.toObject())
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const businessId = req.user._id;
        const { _id, name, phone, email, address } = req.body ?? {};

        if (!_id || !name || !phone || !email) {
            return res.status(400).json({
                message: "Customer ID, name, phone, and email are required",
            });
        }

        const customer = await CustomerModel.findOne({ _id, businessId });
        if (!customer) {
            return res.status(404).json({
                message: "Customer not found or does not belong to your business",
            });
        }

        const existingCustomer = await CustomerModel.findOne({
            _id: { $ne: _id },
            email,
            phone,
            businessId,
        });
        if (existingCustomer) {
            return res.status(409).json({
                message: "Another customer with this email & phone already exists for your business",
            });
        }

        const updatedCustomer = await CustomerModel.findOneAndUpdate(
            { _id, businessId },
            { name, phone, email, address },
            { new: true, runValidators: true }
        ).select("-businessId -__v");

        return res.status(200).json({
            message: "Customer updated successfully",
            customer: updatedCustomer,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteCustomers = async (req: Request, res: Response) => {
    try {
        const businessId = req.user._id;
        const { ids } = req.body as { ids: string[] };

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Customer IDs are required" });
        }

        const result = await CustomerModel.deleteMany({
            _id: { $in: ids },
            businessId,
        });

        return res.status(200).json({
            message: `${result.deletedCount} customer${result.deletedCount > 1 ? "s" : ""} deleted successfully`,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};