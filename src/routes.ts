import { Application, Router } from 'express';
import { ProductController } from './controllers/ProductController';
import { CategoryController } from './controllers/CategoryController';
import { UserController } from './controllers/UserController';
import { OrderController } from './controllers/OrderController';

const _routes: [string, Router][] = [
  ['/products', ProductController],
  ['/categories', CategoryController],
  ['/users', UserController],
  ['/orders', OrderController],
];

export const routes = (server: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    server.use(url, controller);
  });
};
