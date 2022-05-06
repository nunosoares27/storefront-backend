import { NextFunction, Request, Response } from 'express';
import Client from '../database';
import { orderMessages } from '../helpers/messages';

export default async function validateOrderId(req: Request, res: Response, next: NextFunction) {
  if (req.params.id) {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM orders where id = $1';
      const order = await db_connection.query(sql, [req.params.id]);
      db_connection.release();
      if (!order.rows[0]) return res.status(200).send({ message: orderMessages.theresNoOrderWithId(req.params.id) });
      next();
    } catch (error) {
      throw new Error(orderMessages.getOrderFail(error));
    }
  }
  if (!req.params.id) next();
}
