import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { getUser, loginUser, sendOTP, verifyOTP, logoutUser } from "../controllers/authControllers";

const router = Router();

router.get("/user", verifyUser, getUser);
router.post("/login", loginUser);
router.post("/otp/send", sendOTP);
router.post("/otp/verify", verifyOTP);
router.get("/logout", verifyUser, logoutUser);

export default router;