import { NextFunction, Request, Response, Router } from 'express';
import CategoryService from '../services/CategoryService';
import validateCategoryId from '../middlewares/validateCategoryId';

export const CategoryController: Router = Router();
const categoryService = new CategoryService();

CategoryController.get('/', async (req: Request, res: Response, next: NextFunction) => categoryService.getCategories(req, res, next));
CategoryController.post('/', async (req: Request, res: Response, next: NextFunction) => categoryService.createCategory(req, res, next));
CategoryController.put('/:id', async (req: Request, res: Response, next: NextFunction) => categoryService.editCategory(req, res, next));
CategoryController.delete('/:id', validateCategoryId, async (req: Request, res: Response, next: NextFunction) =>
  categoryService.deleteCategory(req, res, next),
);
CategoryController.get('/:id', async (req: Request, res: Response, next: NextFunction) => categoryService.getCategoryById(req, res, next));
