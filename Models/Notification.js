// E:\Backend\Models\Notification.js

import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const NotificationSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
        link: {
            type: String, // Optional: URL to redirect the user to
        },
        // We can also embed some related data here if needed, e.g., orderId
        orderId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Orders', // Ensure this matches your Orders model name
        }
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

// Mongoose ko batayen ke is schema se 'Notification' naam ka model banaya jaye
export default models.Notification || model('Notification', NotificationSchema);