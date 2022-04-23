import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes';

export const server: Application = express();
server.use(bodyParser.json());
routes(server);
