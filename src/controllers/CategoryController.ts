import { Request, Response, Router } from 'express';
import CategoryService from '../services/CategoryService';
import validateCategoryId from '../middlewares/validateCategoryId';
import { validateToken } from '../middlewares/validateToken';

export const CategoryController: Router = Router();
const categoryService = new CategoryService();

CategoryController.get('/', async (req: Request, res: Response) => categoryService.getCategories(req, res));
CategoryController.post('/', validateToken, async (req: Request, res: Response) => categoryService.createCategory(req, res));
CategoryController.put('/:id', validateToken, validateCategoryId, async (req: Request, res: Response) => categoryService.editCategory(req, res));
CategoryController.delete('/:id', validateToken, validateCategoryId, async (req: Request, res: Response) => categoryService.deleteCategory(req, res));
CategoryController.get('/:id', async (req: Request, res: Response) => categoryService.getCategoryById(req, res));
