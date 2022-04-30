import { Request, Response } from 'express';
import { Store } from '../models/Order';
import { orderMessages } from '../helpers/messages';

const store = new Store();

class OrderService {
  getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await store.index();
      res.status(200).send(orders);
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };

  getOrderById = async (req: Request, res: Response) => {
    try {
      const order = await store.getById(parseInt(req.params.id));
      if (!order) res.status(200).send({ message: orderMessages.theresNoOrderWithId(req.params.id) });
      res.status(200).send(order);
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };

  createOrder = async (req: Request, res: Response) => {
    try {
      const newOrder = await store.create({ user_id: req.body.user_id, status: req.body.status });
      res.status(201).send(newOrder);
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };

  editOrder = async (req: Request, res: Response) => {
    try {
      await store.update(req);
      res.status(200).send({ message: orderMessages.editWithSuccess });
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };

  deleteOrder = async (req: Request, res: Response) => {
    try {
      await store.delete({ id: parseInt(req.params.id) });
      res.status(200).send({ message: orderMessages.deletedWithSuccess });
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };
}

export default OrderService;