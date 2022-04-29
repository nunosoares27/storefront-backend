import { Request, Response, Router } from 'express';
import UserService from '../services/UserService';
import { validateToken } from '../middlewares/validateToken';

export const UserController: Router = Router();
const userService = new UserService();

UserController.get('/', validateToken, async (req: Request, res: Response) => userService.getUsers(req, res));
UserController.post('/register', async (req: Request, res: Response) => userService.register(req, res));
UserController.post('/login', async (req: Request, res: Response) => userService.login(req, res));
// CategoryController.put('/:id', validateCategoryId, async (req: Request, res: Response) => categoryService.editCategory(req, res));
// CategoryController.delete('/:id', validateCategoryId, async (req: Request, res: Response) => categoryService.deleteCategory(req, res));
// CategoryController.get('/:id', async (req: Request, res: Response) => categoryService.getCategoryById(req, res));
