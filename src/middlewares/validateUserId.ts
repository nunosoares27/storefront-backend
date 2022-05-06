import { NextFunction, Request, Response } from 'express';
import Client from '../database';
import { userMessages } from '../helpers/messages';

export default async function validateUserId(req: Request, res: Response, next: NextFunction) {
  if (req.body.user_id) {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM users where id = $1';
      const user = await db_connection.query(sql, [req.body.user_id]);
      db_connection.release();
      if (!user.rows[0]) return res.status(200).send({ message: userMessages.theresNoUserWithId(req.body.user_id) });
      next();
    } catch (error) {
      throw new Error(userMessages.getUserFail(error));
    }
  }
  if (!req.body.user_id) next();
}
