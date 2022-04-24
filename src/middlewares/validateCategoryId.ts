import Client from '../database';
import { NextFunction, Request, Response } from 'express';

export default async function validateCategoryId(req: Request, res: Response, next: NextFunction) {
  try {
    const db_connection = await Client.connect();
    const sql = 'SELECT * FROM categories where id = $1';
    const category = await db_connection.query(sql, [req.params.id]);
    db_connection.release();
    if (!category.rows[0]) return res.status(200).send({ message: `Theres no Category by Id ${req.params.id}` });
    next();
  } catch (error) {
    throw new Error(`Cannot create Category =(, ${error} )`);
  }
}
