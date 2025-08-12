import { Router } from "express";
import { createCategory, getAllCategories } from '../Controllers/categoryController.js';

export let categoryRoutes = Router();

categoryRoutes.post("/createCategory", createCategory);
categoryRoutes.get("/getallCategories", getAllCategories);

