import Notification from '../Models/Notification.js';
import asyncHandler from 'express-async-handler';
import Users from "../Models/Users.js"

export const createNotification = asyncHandler(async (req, res, next) => {
  const { title, message } = req.body;

  // 🟢 Token se milne wali ID
  const userId = req.user.id;

  // 🟢 Check for required fields
  if (!title || !message) {
    return res.status(400).json({ message: 'Title and message are required.' });
  }

  // 🟢 Get user details from DB
  const user = await Users.findById(userId).select('username profilePicture');

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

       const date = new Date();
   const formattedDate = date.toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
  
  const notification = new Notification({
    title,
    message,
    date: formattedDate,
    userId: userId, // 🔁 optional if you store userId
    username: user.username,
    userPic: user.profilePicture,
  });

  await notification.save();

  res.status(201).json({ message: 'Notification created.', data: notification });
});

export const getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find().sort({ date: -1 }); // latest first
  res.status(200).json({ status: true, message: 'Notifications fetched.', data: notifications });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findById(id);

  if (!notification) {
    return res.status(404).json({ message: 'Notification not found.' });
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json({ message: 'Notification marked as read.', data: notification });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findById(id);

  if (!notification) {
    return res.status(404).json({ message: 'Notification not found.' });
  }

  await notification.deleteOne();  // OR: await Notification.findByIdAndDelete(id);

  res.status(200).json({ message: 'Notification deleted successfully.' });
});
