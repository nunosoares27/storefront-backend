import { Request, Response, Router } from 'express';
import UserService from '../services/UserService';
import { validateToken } from '../middlewares/validateToken';

export const UserController: Router = Router();
const userService = new UserService();

UserController.get('/', validateToken, async (req: Request, res: Response) => userService.getUsers(req, res));
UserController.post('/register', async (req: Request, res: Response) => userService.register(req, res));
UserController.post('/login', async (req: Request, res: Response) => userService.login(req, res));
UserController.put('/:id', validateToken, async (req: Request, res: Response) => userService.editUser(req, res));
UserController.delete('/:id', validateToken, async (req: Request, res: Response) => userService.deleteUser(req, res));
UserController.get('/:id', validateToken, async (req: Request, res: Response) => userService.getUserById(req, res));
