import express, { Application } from 'express';
import cors from 'cors';
import { routes } from './routes';

export const server: Application = express();
server.use(express.json());
server.use(cors());
routes(server);
