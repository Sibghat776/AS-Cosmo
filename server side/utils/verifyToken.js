import jwt from "jsonwebtoken"
import { createError } from "../utils/responseHandlers.js"

export let verifyToken = (req, res, next) => {
    // Pehle Authorization header check karein
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; // Bearer ke baad token extract karein
    } else if (req.cookies && req.cookies.access_token) {
        token = req.cookies.access_token; // Fallback to cookies
    }

    // --- Yahan debugging line add karein ---
    console.log("Received Token Value in Middleware:", token);

    if (!token) {
        // Yeh block chalna chahiye agar token bilkul na ho
        return next(createError(401, "You are not authenticated! No token provided."));
    }

    // `jwt malformed` ka error is line par aata hai, jab token ki value ghalat ho
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            // Agar token invalid ho to 403 error dein
            return next(createError(403, "Token is not valid or has expired!"));
        }
        req.user = user; // Decoded user payload ko request object se attach karein
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            next(createError(401, "You are not authorized"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            next(createError(401, "You are not Admin !"))
        }
    })
}