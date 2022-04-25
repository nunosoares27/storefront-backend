import { Request, Response } from 'express';
import { Store } from '../models/Product';
import { productMessages } from '../helpers/messages';

const store = new Store();

class ProductService {
  getProducts = async (req: Request, res: Response) => {
    try {
      const products = await store.index();
      res.status(200).send(products);
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };
  getProductsByCategory = async (req: Request, res: Response) => await res.status(200).end('List of products by Category');
  getMostPopularProducts = async (req: Request, res: Response) => await res.status(200).end('List of 5 most popular products');
  getProductById = async (req: Request, res: Response) => {
    try {
      const product = await store.getById(parseInt(req.params.id));
      console.log(product);
      if (!product) res.status(200).send({ message: productMessages.theresNoProductWithId(req.params.id) });
      res.status(200).send(product);
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };
  createProduct = async (req: Request, res: Response) => {
    try {
      const newProduct = await store.create({ name: req.body.name, price: req.body.price, category_id: req.body.category_id });
      res.status(201).send(newProduct);
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };
  editProduct = async (req: Request, res: Response) => {
    try {
      await store.update(req);
      // await store.update({ id: parseInt(req.params.id), name: req.body.name, price: req.body.price, category_id: parseInt(req.body.category_id) });
      res.status(200).send({ message: productMessages.editWithSuccess });
    } catch (error) {
      res.statusMessage = error;
      res.status(400).end();
    }
  };
  deleteProduct = async (req: Request, res: Response) => await res.status(200).end('Delete product');
  deleteCategory = async (req: Request, res: Response) => await res.status(200).end('Delete category');
}

export default ProductService;
