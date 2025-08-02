import express from 'express';
import { createNotification, deleteNotification, getAllNotifications, markAsRead } from '../Controllers/notificationController.js';
import { verifyToken} from '../utils/verifyToken.js';

export const notificationRoutes = express.Router();

notificationRoutes.post("/", verifyToken, createNotification)
notificationRoutes.get("/", getAllNotifications)
notificationRoutes.put("/:id", markAsRead)
notificationRoutes.delete("/:id", deleteNotification)