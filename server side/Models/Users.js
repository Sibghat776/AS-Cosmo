import mongoose from "mongoose";
let { Schema } = mongoose

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    mobileNumber: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    date: {
        type: String,
    }
}, { timestamps: true })

export default mongoose.model("User", UserSchema)