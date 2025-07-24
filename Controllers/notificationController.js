import asyncHandler from 'express-async-handler';
import { createError, createSuccess } from '../utils/responseHandlers.js'
import Notification from '../Models/Notification.js'; // Import the Notification model

// Helper function to be called from other controllers
// For example, from orderController when an order status changes
export const createNotification = async (userId, message, link, orderId = null) => {
    try {
        const newNotification = new Notification({
            user: userId,
            message,
            link,
            orderId
        });

        await newNotification.save();
        console.log(`Notification created for user ${userId}: ${message}`);
        return newNotification;

    } catch (error) {
        console.error("Error creating notification:", error);
        // Do not throw an error, as this is a background task and should not stop the main process.
        // The main controller (e.g., orderController) will continue to work.
    }
};

// @desc    Get all unread notifications for a user
// @route   GET /api/v1/notifications
// @access  Private (User)
export const getNotifications = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log(userId, "User Id from GetNotification API")

        const notifications = await Notification.find({ user: userId, read: false })
            .sort({ createdAt: -1 }); // Get the latest notifications first

        const successRes = createSuccess(200, "Unread notifications retrieved successfully.");
        res.status(200).json({ successRes, data: notifications });

    } catch (error) {
        // asyncHandler will handle this error and pass it to the error handling middleware
        next(error);
    }
});

// @desc    Mark a notification as read
// @route   PUT /api/v1/notifications/:id
// @access  Private (User)
export const markAsRead = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params; // Notification ID
        const userId = req.user.id;

        const notification = await Notification.findById(id);

        if (!notification) {
            return next(createError(404, "Notification not found."));
        }

        // Check if the notification belongs to the logged-in user
        if (notification.user.toString() !== userId) {
            return next(createError(403, "You are not authorized to access this notification."));
        }

        notification.read = true;
        await notification.save();

        const successRes = createSuccess(200, "Notification marked as read.");
        res.status(200).json({ successRes, data: notification });

    } catch (error) {
        // asyncHandler will handle this error and pass it to the error handling middleware
        next(error);
    }
});