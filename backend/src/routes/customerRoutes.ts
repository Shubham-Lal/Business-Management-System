import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser";
import { getCustomers, createCustomer, updateCustomer, deleteCustomers } from "../controllers/customerControllers";

const router = Router();

router.get("/", verifyUser, getCustomers);
router.post("/", verifyUser, createCustomer);
router.put("/", verifyUser, updateCustomer);
router.delete("/", verifyUser, deleteCustomers);

export default router;