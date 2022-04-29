import { Request, Response } from 'express';
import { Store } from '../models/User';
import { userMessages } from '../helpers/messages';

const store = new Store();

class UserService {
  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await store.index();
      res.status(200).send(users);
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const user = await store.login(res, req.body);
      res.status(200).send(user);
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const user = await store.register(res, req.body);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(400).send(userMessages.registerUserFailGeneric);
      }
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };
}

export default UserService;
