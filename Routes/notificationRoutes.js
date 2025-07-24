import express from 'express';
import { getNotifications, markAsRead } from '../Controllers/notificationController.js';
import { verifyUser } from '../utils/verifyToken.js';






export const notificationRoutes = express.Router();
notificationRoutes.get('/getNotifications',verifyUser, getNotifications); // Get all unread notifications for the logged-in user
notificationRoutes.put('/markAsRead/:id',verifyUser, markAsRead); // Mark a specific notification as read
