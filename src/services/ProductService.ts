import { NextFunction, Request, Response } from 'express';

class ProductService {
  getProducts = async (req: Request, res: Response, next: NextFunction) => await res.status(200).end('List of products');
  getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => await res.status(200).end('List of products by Category');
  getMostPopularProducts = async (req: Request, res: Response, next: NextFunction) => await res.status(200).end('List of 5 most popular products');
  getProductById = async (req: Request, res: Response, next: NextFunction) => await res.status(200).end('Product by id');
  createProduct = async (req: Request, res: Response, next: NextFunction) => await res.status(201).end('Create product');
  editProduct = async (req: Request, res: Response, next: NextFunction) => await res.status(204).end('Edit product');
  deleteProduct = async (req: Request, res: Response, next: NextFunction) => await res.status(200).end('Delete product');
  deleteCategory = async (req: Request, res: Response, next: NextFunction) => await res.status(200).end('Delete category');
}

export default ProductService;
