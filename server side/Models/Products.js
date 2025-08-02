import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        default: 1,
        min: [0, 'Stock cannot be negative'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Products = mongoose.model('Products', productSchema);
export default Products;