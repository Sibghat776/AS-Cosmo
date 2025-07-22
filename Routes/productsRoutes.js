import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../Controllers/productsController.js';
import upload from '../middlewares/upload.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';

export let productsRoutes = express.Router();


productsRoutes.post('/createProduct', verifyUser, verifyToken, upload.array("images", 5), createProduct);

productsRoutes.put('/updateProduct/:id', verifyUser, verifyToken, upload.array("images", 5), updateProduct); // Assuming updateProduct uses the same logic as createProduct

productsRoutes.get('/getProducts', verifyToken, getProducts);

productsRoutes.get('/getProduct/:id', verifyToken, getProduct); // Assuming you want to get products by user ID or similar

productsRoutes.delete('/deleteProduct/:id', verifyUser, verifyToken, deleteProduct);