import express from 'express';
import { getUser, getUsers, login, logout, register, updateUser } from '../Controllers/authController.js';
import { verifyToken } from '../utils/verifyToken.js';

export let authRoutes = express.Router();

authRoutes.post('/register', register);

authRoutes.post('/login', login);

authRoutes.put("/update", verifyToken, updateUser); 

authRoutes.get('/logout', logout);

authRoutes.get("/getUsers", getUsers);

authRoutes.get("/getUser/:id", getUser);