    import { createError } from '../utils/responseHandlers.js';
    import { createSuccess } from '../utils/responseHandlers.js';
    import Category from '../Models/Category.js';

    // Create a new category
    export const createCategory = async (req, res, next) => {
        try {
            const { name, description } = req.body;

            // Check if category already exists
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return next(createError(400, "Category already exists"));
            }

            const category = await Category.create({ name, description });
            let SuccessRes = createSuccess(201, "Category created successfully");
            res.status(201).json({
                SuccessRes,
                data: category
            });
        } catch (error) {
            next(error)
        }
    };

    // Get all categories
    export const getAllCategories = async (req, res) => {
        try {
            const categories = await Category.find().sort({ createdAt: -1 });
            let successRes = createSuccess(200, "Categories fetched successfully");
            res.status(200).json({
                successRes,
                data: categories
            });
        } catch (error) {
            next(error);
        }
    };
