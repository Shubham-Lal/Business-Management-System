import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel, { UserDocument } from "../models/User";

interface JwtPayload {
    _id: string;
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.bmsToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        const user: UserDocument | null = await UserModel.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};