import { Request, Response } from 'express';
import { Store } from '../models/Category';
import { categoryMessages } from '../helpers/messages';

const store = new Store();

class CategoryService {
  getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await store.index();
      res.status(200).send(categories);
    } catch (error: unknown) {
      res.statusMessage = error as unknown as string;
      res.status(400).end();
    }
  };

  getCategoryById = async (req: Request, res: Response) => {
    try {
      const category = await store.getById(parseInt(req.params.id));
      if (!category) res.status(200).send({ message: categoryMessages.theresNoCategoryWithId(req.params.id) });
      res.status(200).send(category);
    } catch (error: unknown) {
      res.statusMessage = error as unknown as string;
      res.status(400).end();
    }
  };

  createCategory = async (req: Request, res: Response) => {
    try {
      const newCategory = await store.create(req.body.name);
      res.status(201).send(newCategory);
    } catch (error: unknown) {
      res.statusMessage = error as unknown as string;
      res.status(400).end();
    }
  };

  editCategory = async (req: Request, res: Response) => {
    try {
      await store.update({ id: parseInt(req.params.id), name: req.body.name });
      res.status(200).send({ message: categoryMessages.editWithSuccess });
    } catch (error) {
      res.status(204).send(error);
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      await store.delete({ id: parseInt(req.params.id) });
      res.status(200).send({ message: categoryMessages.deletedWithSuccess });
    } catch (error: unknown) {
      res.statusMessage = error as unknown as string;
      res.status(400).end();
    }
  };
}

export default CategoryService;
