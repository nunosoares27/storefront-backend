import { Response } from 'express';
import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { RegisterUserDTO, User, LoginUserDTO } from '../interfaces/index';
import { userMessages } from '../helpers/messages';

dotenv.config();
const token_secret = process.env.TOKEN_SECRET!;
const pepper = process.env.BCRYPT_PASSWORD as string;
const salt = process.env.SALT_ROUNDS as string;

export class Store {
  async index(): Promise<User[]> {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT id, firstName, lastName FROM users';
      const users = await db_connection.query(sql);
      db_connection.release();
      return users.rows;
    } catch (error) {
      throw new Error(userMessages.getusersFail(error));
    }
  }

  async login(res: Response, user: LoginUserDTO): Promise<string> {
    if (!user.password || !user.firstName || !user.lastName) {
      throw new Error(userMessages.missingFields);
    } else {
      try {
        const db_connection = await Client.connect();
        const sql = 'SELECT * FROM users WHERE firstname=($1) AND lastname=($2)';
        const result = await db_connection.query(sql, [user.firstName, user.lastName]);

        if (result.rows.length) {
          const dbUser = result.rows[0];
          db_connection.release();
          if (bcrypt.compareSync(user.password + pepper, dbUser.password)) {
            const token = jwt.sign({ user: dbUser }, token_secret);
            return res.json(token) as unknown as string;
          }
        }
        throw new Error(userMessages.loginFail);
      } catch (error) {
        throw new Error(userMessages.loginFailWithError(error));
      }
    }
  }

  async register(res: Response, user: RegisterUserDTO): Promise<string> {
    if (!user.password || !user.firstName || !user.lastName) {
      throw new Error(userMessages.missingFields);
    } else {
      try {
        const hash = bcrypt.hashSync(user.password + pepper, parseInt(salt));

        const db_connection = await Client.connect();
        const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
        const regist = await db_connection.query(sql, [user.firstName, user.lastName, hash]);
        const registeredUser = regist.rows[0];
        db_connection.release();
        const token = jwt.sign({ user: registeredUser }, token_secret);
        return res.json(token) as unknown as string;
      } catch (error) {
        throw new Error(userMessages.registerUserFail(error));
      }
    }
  }
}
