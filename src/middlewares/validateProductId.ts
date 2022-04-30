import { NextFunction, Request, Response } from 'express';
import Client from '../database';
import { productMessages } from '../helpers/messages';

export default async function validateProductId(req: Request, res: Response, next: NextFunction) {
  try {
    const db_connection = await Client.connect();
    const sql = 'SELECT * FROM products where id = $1';
    const product = await db_connection.query(sql, [req.params.id]);
    db_connection.release();
    if (!product.rows[0]) return res.status(200).send({ message: productMessages.theresNoProductWithId(req.params.id) });
    next();
  } catch (error) {
    throw new Error(productMessages.getProductFail(error));
  }
}
