import Users from "../Models/Users.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError, createSuccess } from "../utils/responseHandlers.js";

export const register = async (req, res, next) => {
    try {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(req.body.password, salt)
        const date = new Date();
        const formattedDate = date.toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        let newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            date: formattedDate
        })
        let existingUser = await Users.findOne({ username: req.body.username })
        if (existingUser) {
            return res.status(400).json("Username already taken!")
        } else if (existingUser?.email === req.body.email) {
            return res.status(400).json("Email already registered!")
        } else if (req.body.password.length < 6) {
            return res.status(400).json("Password must be at least 6 characters long!")
        }
        let successRes = createSuccess(200, "User has been created successfully")
        await newUser.save()
        res.status(200).json({ successRes, data: newUser })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {

        console.log(req.body.email, "email")

        let user = await Users.findOne({ email: req.body.email })
        if (!user) return next(createError(401, "User not found"))

        let isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)

        if (!isPasswordCorrect) return next(createError(400, "Wrong Credentials"))
        if (user.email !== req.body.email) return next(createError(400, "Wrong Credentials"))
        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT || "cosmetics", { expiresIn: "3d" }
        )
        let { password, ...otherDetails } = user._doc
        res.status(200).json({
            status: true,
            message: "user logged in successfully",
            token: token,
            userData: user
        })

    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.user.id; // assuming `req.user` is already set via auth middleware

        // Remove empty strings or undefined fields
        const updateData = {};
        const fields = ["firstName", "lastName", "mobileNumber", "location", "profilePicture", "gender", "desc"];

        console.log(req.body.profilePicture, "===>>> profile Pic")

        fields.forEach(field => {
            if (req.body[field] !== undefined && req.body[field] !== "") {
                updateData[field] = req.body[field];
            }
        });

        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        );

        if (!updatedUser) return next(createError(404, "User not found"));

        const { password, ...otherDetails } = updatedUser._doc;

        const successRes = createSuccess(200, "User updated successfully");
        res.status(200).json({ successRes, data: otherDetails });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        let successRes = createSuccess(200, "User has been logged out successfully");
        res.status(200).json({ successRes });
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await Users.find();
        if (!users || users.length === 0) {
            return next(createError(404, "No users found."));
        }
        let successRes = createSuccess(200, "Users retrieved successfully.");
        res.status(200).json({ successRes, data: users });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await Users.findById(userId);
        if (!user) {
            return next(createError(404, "User not found."));
        }
        let successRes = createSuccess(200, "User retrieved successfully.");
        res.status(200).json({ successRes, data: user });
    } catch (error) {
        next(error);
    }
}