import asyncHandler from 'express-async-handler';
import { createError, createSuccess } from '../utils/responseHandlers.js';
import Cart from '../Models/Cart.js'; // Cart model import karein
import Products from '../Models/Products.js';

// 1. Add Item to Cart
export const addToCart = asyncHandler(async (req, res, next) => {

    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id; // Authenticated user ki ID
    console.log(userId, "User ID from token:", userId);
    if (!productId) {
        return next(createError(400, "Product ID is required."));
    }
    if (quantity < 1) {
        return next(createError(400, "Quantity must be at least 1."));
    }

    // Product ko dhoondhe aur uska stock check karein
    const product = await Products.findById(productId);
    if (!product) {
        return next(createError(404, "Product not found."));
    }
    if (product.stock < quantity) {
        return next(createError(400, `Only ${product.stock} items are available in stock for ${product.name}.`));
    }

    // User ki cart dhoondhe ya naya banaye
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        // Agar user ki cart mojood nahi hai, to naya cart banayen
        cart = await Cart.create({
            user: userId,
            items: []
        });
    }

    // Cart mein item add ya update karein
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        // Item pehle se cart mein hai, quantity update karein
        cart.items[itemIndex].quantity += quantity;
        // stock ko dobara check karein update hone ke baad
        if (Products.stock < cart.items[itemIndex].quantity) {
            return next(createError(400, `Cannot add more. Total quantity in cart for ${product.name} would exceed stock.`));
        }
    } else {
        // Item naya hai, cart mein add karein
        cart.items.push({
            product: productId,
            quantity: quantity,
            price: product.price // Product ki current price store karein
        });
    }

    await cart.save();

    // Response mein updated cart items return karein
    // Product details populate karne ke liye:
    const populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price images');

    const successRes = createSuccess(200, "Item added to cart successfully.");
    res.status(200).json({ successRes, data: populatedCart });
});

// 2. Get User Cart Items
export const getUserCart = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price images stock');

    if (!cart) {
        // Agar cart mojood nahi hai, to empty cart return karein
        const successRes = createSuccess(200, "Cart is empty.");
        return res.status(200).json({ successRes, data: { user: userId, items: [] } });
    }

    const successRes = createSuccess(200, "Cart items retrieved successfully.");
    res.status(200).json({ successRes, data: cart });
});

// 3. Update Cart Item Quantity
export const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
    try {
        const { productId, quantity } = req.body; // New quantity
        const userId = req.user.id;

        if (!productId || quantity === undefined || quantity < 0) { // quantity can be 0 to remove
            return next(createError(400, "Product ID and valid quantity are required."));
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return next(createError(404, "Cart not found for this user."));
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return next(createError(404, "Product not found in cart."));
        }

        const product = await Products.findById(productId);
        if (!product) {
            return next(createError(404, "Associated product not found.")); // Product may have been deleted
        }

        if (quantity === 0) {
            // Item ko cart se hata dain
            cart.items.splice(itemIndex, 1);
            await cart.save();
            const populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price images stock');
            const successRes = createSuccess(200, "Item removed from cart successfully.");
            return res.status(200).json({ successRes, data: populatedCart });
        }

        // Stock check for updated quantity
        if (product.stock < quantity) {
            return next(createError(400, `Only ${product.stock} items are available in stock for ${product.name}.`));
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        const populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price images stock');
        const successRes = createSuccess(200, "Cart item quantity updated successfully.");
        res.status(200).json({ successRes, data: populatedCart });
    } catch (error) {
        next(error);
    }
});

// 4. Remove Item from Cart
export const removeCartItem = asyncHandler(async (req, res, next) => {
    const { productId } = req.params; // Product ID from URL params
    const userId = req.user.id;

    if (!productId) {
        return next(createError(400, "Product ID is required."));
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return next(createError(404, "Cart not found for this user."));
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex === -1) {
        return next(createError(404, "Product not found in cart."));
    }

    // Item ko cart se hata dain
    cart.items.splice(itemIndex, 1);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price images stock');
    const successRes = createSuccess(200, "Item removed from cart successfully.");
    res.status(200).json({ successRes, data: populatedCart });
});