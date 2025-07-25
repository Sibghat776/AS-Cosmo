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

    if (!token) {
        return next(createError(401, "You are not authenticated! No token provided."));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            console.error("JWT Verification Error:", err); // Debugging
            return next(createError(403, "Token is not valid!")); // 403 for invalid/expired token
        }
        req.user = user; // Attach decoded user payload to req.user
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            next(createError(401, "You are note authorized"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            next(createError(401, "You are not authorized"))
        }
    })
}