import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            unique: true,
            trim: true,
            maxlength: [50, 'Category name must be less than 50 characters'],
        },
        description: {
            type: String,
            maxlength: [500, 'Description must be less than 500 characters'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

export default models.Category || model('Category', CategorySchema);
