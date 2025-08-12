import { tryCatch } from "bullmq";
import Orders from "../Models/Orders.js";

export const placeOrder =  async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      address,
      city,
      orderNote,
      totalPrice,
      totalItems,
      orders,
      id
    } = req.body;

    console.log(req.body, "======>>>>>> req.body")

    if (!fullName || !email || !phoneNumber || !address || !city || !totalPrice || !totalItems || !orders) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newOrder = new Orders({
      fullName,
      email,
      phoneNumber,
      address,
      city,
      orderNote,
      totalPrice,
      totalItems,
      orders,
      userId: id
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find(); // Saare orders fetch karega
    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};

export const deleteOrder = async (req, res)=> {
try {
  const id = req.params.id
const deletesOrder = await Orders.findByIdAndDelete(id)
res.status(200).json({
  status: true,
  message: "order Deleted Successfully"
})
} catch (error) {
  
}
};