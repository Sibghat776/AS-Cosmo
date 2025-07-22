import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const OrderItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: { // Price at the time of order
        type: Number,
        required: true,
    },
    image: { // Product's main image URL
        type: String,
        required: true,
    },
    product: { // Reference to the actual product
        type: mongoose.Schema.ObjectId,
        ref: 'Products', // Ensure this matches your Products model name
        required: true,
    },
});

const OrderSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        shippingInfo: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            // state: { type: String, required: true }, // Optional: If applicable
            country: { type: String, required: true },
            pinCode: { type: String, required: true },
            phoneNo: { type: String, required: true },
        },
        orderItems: [OrderItemSchema], // Array of products in the order
        paymentInfo: {
            id: { type: String, required: true }, // Payment gateway transaction ID
            status: { type: String, required: true }, // e.g., "succeeded", "pending"
        },
        paidAt: {
            type: Date,
            required: true,
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        orderStatus: {
            type: String,
            required: true,
            default: 'Processing', // Possible statuses: Processing, Shipped, Delivered, Cancelled
        },
        deliveredAt: Date, // Date when the order was delivered
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

export default models.Order || model('Orders', OrderSchema);