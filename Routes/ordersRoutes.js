import express from 'express';
export const ordersRoutes = express.Router();
import {
    createOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
} from '../Controllers/orderController.js';
import { verifyToken, verifyAdmin } from '../utils/verifyToken.js'; // Assuming verifyToken and verifyAdmin are in auth.js

// User Routes for Orders
ordersRoutes.post('/createOrder', verifyToken, createOrder); // Place a new order
ordersRoutes.get('/getOrder/:id', verifyToken, getSingleOrder); // Get details of a single order (user specific)
ordersRoutes.get('/myOrders', verifyToken, myOrders); // Get all orders for the logged-in user

// Admin Routes for Orders
ordersRoutes.get('/getAllOrders', verifyToken, verifyAdmin, getAllOrders); // Get all orders (Admin)
ordersRoutes.put('/updateOrder/:id', verifyToken, verifyAdmin, updateOrderStatus); // Update order status (Admin)
ordersRoutes.delete('/deleteOrder/:id', verifyToken, verifyAdmin, deleteOrder); // Delete an order (Admin)
