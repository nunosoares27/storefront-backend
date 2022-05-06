import { NextFunction, Request, Response } from 'express';
import Client from '../database';
import { categoryMessages } from '../helpers/messages';

export default async function validateCategoryId(req: Request, res: Response, next: NextFunction) {
  if (req.params.id) {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM categories where id = $1';
      const category = await db_connection.query(sql, [req.params.id]);
      db_connection.release();
      if (!category.rows[0]) return res.status(200).send({ message: categoryMessages.theresNoCategoryWithId(req.params.id) });
      next();
    } catch (error) {
      throw new Error(categoryMessages.getCategoryFail(error));
    }
  }
  if (!req.params.id) next();
}
