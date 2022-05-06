import { Request, Response, Router } from 'express';
import ProductService from '../services/ProductService';
import { validateToken } from '../middlewares/validateToken';

export const ProductController: Router = Router();
const productService = new ProductService();

ProductController.get('/', async (req: Request, res: Response) => productService.getProducts(req, res));
ProductController.get('/category/:id', async (req: Request, res: Response) => productService.getProductsByCategory(req, res));
ProductController.post('/', validateToken, async (req: Request, res: Response) => productService.createProduct(req, res));
ProductController.put('/:id', validateToken, async (req: Request, res: Response) => productService.editProduct(req, res));
ProductController.delete('/:id', validateToken, async (req: Request, res: Response) => productService.deleteProduct(req, res));
ProductController.get('/:id', async (req: Request, res: Response) => productService.getProductById(req, res));
