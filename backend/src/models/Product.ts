import mongoose, { Document, Schema, Model } from "mongoose";
import { UserDocument } from "./User";

export interface ProductDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    businessId: mongoose.Types.ObjectId | UserDocument;
}

const ProductSchema: Schema<ProductDocument> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be a positive number"],
        },
        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: [0, "Stock must be a non-negative number"],
        },
        category: {
            type: String,
            required: [true, "Category is required"]
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

const ProductModel: Model<ProductDocument> = mongoose.model<ProductDocument>(
    "Product",
    ProductSchema
);

export default ProductModel;