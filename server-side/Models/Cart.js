import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const CartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Products', // Reference to the Product model
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: [1, 'Quantity cannot be less than 1']
    },
    // Yeh price us waqt ki hogi jab item cart mein add kiya gaya tha.
    // Real-time price product model se leni chahiye frontend par ya checkout ke waqt.
    price: {
        type: Number,
        required: true,
    },
});

const CartSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'Users', // Reference to the User model
            required: true,
            unique: true, // Har user ki sirf ek cart hogi
        },
        items: [CartItemSchema], // Array of CartItemSchema
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

// Agar model pehle se exist karta hai to use karein, warna naya banayen.
export default models.Cart || model('Cart', CartSchema);