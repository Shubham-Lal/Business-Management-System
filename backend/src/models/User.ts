import mongoose, { Schema, Document, Model } from "mongoose";

export interface UserDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema<UserDocument> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#@$%&])^\S*$/,
                "Password must contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character (#@$%&) and no spaces",
            ],
        },
    },
    {
        timestamps: true,
    }
);

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
    "User",
    UserSchema
);

export default UserModel;