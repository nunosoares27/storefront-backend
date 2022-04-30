import { Request, Response, Router } from 'express';
import OrderService from '../services/OrderService';
import { validateToken } from '../middlewares/validateToken';
import validateUserId from '../middlewares/validateUserId';
import validateOrderId from '../middlewares/validateOrderId';

export const OrderController: Router = Router();
const orderService = new OrderService();

OrderController.get('/', validateToken, async (req: Request, res: Response) => orderService.getOrders(req, res));
OrderController.post('/', validateToken, validateUserId, async (req: Request, res: Response) => orderService.createOrder(req, res));
OrderController.put('/:id', validateToken, validateOrderId, validateUserId, async (req: Request, res: Response) => orderService.editOrder(req, res));
OrderController.delete('/:id', validateToken, validateOrderId, async (req: Request, res: Response) => orderService.deleteOrder(req, res));
// OrderController.get('/:id', async (req: Request, res: Response) => orderService.getProductById(req, res));
