import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes"

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.get("/", (req, res) => res.send("Server running..."));
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_DB_URL as string)
  .then(async () => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => console.log(`MongoDB connection error: ${err}`));