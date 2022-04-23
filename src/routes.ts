import { Application, Router } from 'express';
import { ProductController } from './controllers/ProductController';

const _routes: [string, Router][] = [['/products', ProductController]];

export const routes = (server: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    server.use(url, controller);
  });
};
