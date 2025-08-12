import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  orderNote: {
    type: String,
    trim: true,
    default: "" 
  },
  totalPrice: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  orders: {
    type: Array,
    required: true,
    default: []
  },
  userId: {
    type: String,
    required: false,
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
