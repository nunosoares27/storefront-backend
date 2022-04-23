import { NextFunction, Request, Response, Router } from 'express';
import ProductService from '../services/ProductService';

export const ProductController: Router = Router();
const productService = new ProductService();

ProductController.get('/', async (req: Request, res: Response, next: NextFunction) => productService.getProducts(req, res, next));
ProductController.get('/category/:id', async (req: Request, res: Response, next: NextFunction) =>
  productService.getProductsByCategory(req, res, next),
);
ProductController.get('/most-popular', async (req: Request, res: Response, next: NextFunction) =>
  productService.getMostPopularProducts(req, res, next),
);
ProductController.post('/create', async (req: Request, res: Response, next: NextFunction) => productService.createProduct(req, res, next));
ProductController.put('/edit/:id', async (req: Request, res: Response, next: NextFunction) => productService.editProduct(req, res, next));
ProductController.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => productService.deleteProduct(req, res, next));
ProductController.delete('/delete/category/:id', async (req: Request, res: Response, next: NextFunction) =>
  productService.deleteCategory(req, res, next),
);
ProductController.get('/:id', async (req: Request, res: Response, next: NextFunction) => productService.getProductById(req, res, next));
