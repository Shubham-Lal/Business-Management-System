import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { createProduct } from "../controllers/productControllers";

const router = Router();

// router.get("/", verifyUser, getProducts);
router.post("/", verifyUser, createProduct);
// router.put("/", verifyUser, updateProduct);
// router.delete("/", verifyUser, deleteProducts);

export default router;