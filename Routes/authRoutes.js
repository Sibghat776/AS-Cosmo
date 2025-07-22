import express from 'express';
import { login, register } from '../Controllers/authController.js';

export let authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);