import { Application, Router } from 'express';
import { ProductController } from './controllers/ProductController';
import { CategoryController } from './controllers/CategoryController';

const _routes: [string, Router][] = [
  ['/products', ProductController],
  ['/categories', CategoryController],
];

export const routes = (server: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    server.use(url, controller);
  });
};
