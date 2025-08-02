import asyncHandler from 'express-async-handler';
import { createError, createSuccess } from '../utils/responseHandlers.js';
import Orders from '../Models/Orders.js'; // CORRECTED: Ab import ka naam 'Orders' kar diya
import Cart from '../Models/Cart.js';
import Products from '../Models/Products.js';

// Helper function to update product stock after order is placed or cancelled
async function updateStock(productId, quantity) {
    const product = await Products.findById(productId);
    if (!product) {
        throw new Error(`Product with ID ${productId} not found during stock update.`);
    }
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

// 1. Create New Order (From Cart)
export const createOrder = asyncHandler(async (req, res, next) => {
    try {
        const {
            shippingInfo,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (!shippingInfo || !paymentInfo || itemsPrice === undefined || taxPrice === undefined || shippingPrice === undefined || totalPrice === undefined) {
            return next(createError(400, "Please provide all required order details."));
        }

        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price stock images');

        if (!cart || cart.items.length === 0) {
            return next(createError(400, "Your cart is empty. Please add items to place an order."));
        }

        const orderItems = [];
        for (const cartItem of cart.items) {
            const product = cartItem.product;

            if (product.stock < cartItem.quantity) {
                return next(createError(400, `Not enough stock for ${product.name}. Only ${product.stock} available.`));
            }

            orderItems.push({
                name: product.name,
                quantity: cartItem.quantity,
                price: product.price,
                image: product.images.length > 0 ? product.images[0].url : 'no-image-url',
                product: product._id,
            });
        }

        // Create the order
        const order = await Orders.create({ // CORRECTED: Orders.create use kar raha hai
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user.id,
        });

        for (const item of order.orderItems) {
            await updateStock(item.product, item.quantity);
        }

        cart.items = [];
        await cart.save();

        const successRes = createSuccess(201, "Order placed successfully.");
        res.status(201).json({ successRes, data: order });

    } catch (error) {
        next(error)
    }
});

// 2. Get Single Order Details
export const getSingleOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, "Order ID is required."));
    }

    const order = await Orders.findById(id) // CORRECTED: Orders.findById use kar raha hai
        .populate('user', 'username email')
        .populate('orderItems.product', 'name price images');

    if (!order) {
        return next(createError(404, "Order not found."));
    }

    if (order.user._id.toString() !== req.user.id && !req.user.isAdmin) {
        return next(createError(403, "You are not authorized to view this order."));
    }

    const successRes = createSuccess(200, "Order retrieved successfully.");
    res.status(200).json({ successRes, data: order });
});

// 3. Get Logged-in User's Orders
export const myOrders = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;

        const orders = await Orders.find({ user: userId }).populate('orderItems.product', 'name price images'); // CORRECTED: Orders.find use kar raha hai

        if (!orders || orders.length === 0) {
            const successRes = createSuccess(200, "You have not placed any orders yet.");
            return res.status(200).json({ successRes, data: [] });
        }

        const successRes = createSuccess(200, "Your orders retrieved successfully.");
        res.status(200).json({ successRes, data: orders });

    } catch (error) {
        next(error);
    }
});

// 4. Get All Orders (Admin Only)
export const getAllOrders = asyncHandler(async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(createError(403, "Access Denied: Only Admins can view all orders."));
    }

    const orders = await Orders.find().populate('user', 'username email').populate('orderItems.product', 'name price images'); // CORRECTED: Orders.find use kar raha hai

    if (!orders || orders.length === 0) {
        const successRes = createSuccess(200, "No orders found.");
        return res.status(200).json({ successRes, data: [] });
    }

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    const successRes = createSuccess(200, "All orders retrieved successfully.");
    res.status(200).json({ successRes, data: { totalAmount, orders } });
});

// 5. Update Order Status (Admin Only)
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id || !status) {
            return next(createError(400, "Order ID and status are required."));
        }

        if (!req.user.isAdmin) {
            return next(createError(403, "Access Denied: Only Admins can update order status."));
        }

        const order = await Orders.findById(id); // CORRECTED: Orders.findById use kar raha hai

        if (!order) {
            return next(createError(404, "Order not found."));
        }

        if (order.orderStatus === 'Delivered') {
            return next(createError(400, "You have already delivered this order."));
        }

        if (status === 'Shipped' || status === 'Delivered') {
            if (status === 'Delivered') {
                order.deliveredAt = Date.now();
            }
        } else if (status === 'Cancelled') {
            for (const item of order.orderItems) {
                await updateStock(item.product, -item.quantity);
            }
        }

        order.orderStatus = status;
        await order.save();

        const successRes = createSuccess(200, "Order status updated successfully.");
        res.status(200).json({ successRes, data: order });
    } catch (error) {
        next(error)
    }
});

// 6. Delete Order (Admin Only)
export const deleteOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, "Order ID is required."));
    }

    if (!req.user.isAdmin) {
        return next(createError(403, "Access Denied: Only Admins can delete orders."));
    }

    const order = await Orders.findById(id); // CORRECTED: Orders.findById use kar raha hai

    if (!order) {
        return next(createError(404, "Order not found."));
    }

    if (order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled') {
        for (const item of order.orderItems) {
            await updateStock(item.product, -item.quantity);
        }
    }

    await Orders.findByIdAndDelete(id); // CORRECTED: Orders.findByIdAndDelete use kar raha hai

    const successRes = createSuccess(200, "Order deleted successfully.");
    res.status(200).json({ successRes, data: order });
});