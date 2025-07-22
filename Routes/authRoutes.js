import express from 'express';
import { getUser, getUsers, login, logout, register } from '../Controllers/authController.js';

export let authRoutes = express.Router();

authRoutes.post('/register', register);

authRoutes.post('/login', login);

authRoutes.get('/logout', logout);

authRoutes.get("/getUsers", getUsers);

authRoutes.get("/getUser/:id", getUser);