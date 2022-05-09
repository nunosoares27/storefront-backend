import { Request, Response } from 'express';
import { Store } from '../models/User';
import { userMessages } from '../helpers/messages';

const store = new Store();

class UserService {
  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await store.index();
      res.status(200).send(users);
    } catch (error: unknown) {
      res.statusMessage = error as unknown as string;
      res.status(400).end();
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const user = await store.getById(parseInt(req.params.id));
      if (!user) res.status(200).send({ message: userMessages.theresNoUserWithId(req.params.id) });
      res.status(200).send(user);
    } catch (error: unknown) {
      res.statusMessage = error as unknown as string;
      res.status(400).end();
    }
  };

  editUser = async (req: Request, res: Response) => {
    try {
      await store.edit(req);
      res.status(200).send({ message: userMessages.editWithSuccess });
    } catch (error: unknown) {
      res.statusMessage = error as unknown as string;
      res.status(400).end();
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const user = await store.login(res, req.body);
      res.status(200).send(user);
    } catch (error: unknown) {
      res.statusMessage = error as unknown as string;
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
    } catch (error: unknown) {
      res.statusMessage = error as unknown as string;
      res.status(400).end();
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      await store.delete({ id: parseInt(req.params.id) });
      res.status(200).send({ message: userMessages.deletedWithSuccess });
    } catch (error: unknown) {
      res.statusMessage = error as unknown as string;
      res.status(400).end();
    }
  };
}

export default UserService;
