import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { userMessages } from '../helpers/messages';

dotenv.config();
const token_secret = process.env.TOKEN_SECRET!;

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string;
    jwt.verify(token, token_secret);
    next();
  } catch (error) {
    res.statusMessage = userMessages.invalidToken;
    res.status(401).end();
  }
};
