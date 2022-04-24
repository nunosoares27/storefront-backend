import { NextFunction, Request, Response } from 'express';
import { Store } from '../models/Category';

const store = new Store();

class CategoryService {
  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await store.index();
      res.status(200).send(categories);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await store.getById(parseInt(req.params.id));
      if (!category) res.status(200).send({ message: `Theres no category by id ${req.params.id}` });
      res.status(200).send(category);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCategory = await store.create(req.body.name);
      res.status(201).send(newCategory);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  editCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await store.update({ id: parseInt(req.params.id), name: req.body.name });
      res.status(201).send({ message: 'Category edited with sucess' });
    } catch (error) {
      res.status(400).send(error);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await store.delete({ id: parseInt(req.params.id) });
      res.status(200).send({ message: 'Category deleted with success' });
    } catch (error) {
      res.status(400).send(error);
    }
  };
}

export default CategoryService;
