import { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import NodeCache from "node-cache";
import bcrypt from "bcryptjs";
import UserModel from "../models/User";
import sendMail from "../services/mailer";

const otpCache = new NodeCache({ stdTTL: 300 });

const generateToken = (_id: mongoose.Types.ObjectId) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, { expiresIn: "3d" });
};

export const getUser = async (req: Request, res: Response) => {
  const { name, email } = req.user;
  res.status(200).json({ user: { name, email } });
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.cookie("bmsToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful" });
  }
  catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body ?? {};
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpCache.set(email, otp);

    await sendMail({
      from: `${process.env.EMAIL_USER} <${process.env.EMAIL_ADDRESS}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  }
  catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { name, email, password, otp } = req.body ?? {};
    if (!name || !email || !password || !otp) {
      return res
        .status(400)
        .json({ message: "Name, email, password and OTP are required" });
    }

    const cachedOtp = otpCache.get<string>(email);
    if (!cachedOtp || cachedOtp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    otpCache.del(email);

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id);

    res.cookie("bmsToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "Signup successful" });
  }
  catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("bmsToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
};