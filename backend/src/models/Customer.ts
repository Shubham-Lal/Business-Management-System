import mongoose, { Document, Schema, Model } from "mongoose";
import { UserDocument } from "./User";

export interface CustomerDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    phone: string;
    email: string;
    address: string;
    businessId: mongoose.Types.ObjectId | UserDocument;
}

const CustomerSchema: Schema<CustomerDocument> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            match: [
                /^[6-9]\d{9}$/,
                "Please enter a valid phone number",
            ],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },
        address: {
            type: String,
            trim: true,
            default: "",
        },
        businessId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CustomerModel: Model<CustomerDocument> = mongoose.model<CustomerDocument>(
    "Customer",
    CustomerSchema
);

export default CustomerModel;