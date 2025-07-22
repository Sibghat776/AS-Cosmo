import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './Routes/authRoutes.js';
import { productsRoutes } from './Routes/productsRoutes.js';
import { ordersRoutes } from './Routes/ordersRoutes.js';
import { connectDB } from './utils/connectDB.js';
import cookieParser from 'cookie-parser';
import { categoryRoutes } from './Routes/categoryRoutes.js';
import { cartRoutes } from './Routes/cartRoutes.js';

dotenv.config();
let app = express();

//Middlewares
app.use(express.json());
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(cookieParser())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/products", productsRoutes)
app.use("/api/v1/orders", ordersRoutes)
app.use("/api/v1/cart", cartRoutes) 
app.use("/api/v1/category", categoryRoutes)

app.use((err, req, res, next) => {
    let errorStatus = err.status || 500
    let errorMessage = err.message || "Something went Wrong"
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})

connectDB()