import express from 'express';
export const cartRoutes = express.Router();
import {
    getUserCart,
    updateCartItemQuantity,
    removeCartItem,
    addToCart
} from '../Controllers/cartController.js';
import { verifyToken } from '../utils/verifyToken.js';

// Cart routes
cartRoutes.post('/add', verifyToken, addToCart);
cartRoutes.get('/getCart', verifyToken, getUserCart);
cartRoutes.put('/updateCart', verifyToken, updateCartItemQuantity);
cartRoutes.delete('/removeCart/:productId', verifyToken, removeCartItem);