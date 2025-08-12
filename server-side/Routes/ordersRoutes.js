import express from "express";
import { deleteOrder, getAllOrders, placeOrder } from "../Controllers/orderController.js";

const router = express.Router();

router.post("/", placeOrder);
router.get("/", getAllOrders);
router.delete("/:id", deleteOrder);


export default router;
