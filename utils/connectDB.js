import dotenv from 'dotenv';
import mongoose from 'mongoose';

export function connectDB() {
    dotenv.config();
    try {
        mongoose.connect(process.env.MONGO)
        console.log("Connected to DB")

    } catch (error) {
        console.log(error)
    }
}
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected")
})

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected")
})