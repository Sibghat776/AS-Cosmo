import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true
 },
    message: {
    type: String,
    required: true
  },
  userPic: {
    type: String,
  },
  username: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
  }
})

export default mongoose.model("Notification", NotificationSchema)