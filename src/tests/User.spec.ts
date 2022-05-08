import supertest from 'supertest';
import { Response, Request } from 'express';
import { Store as UserStore } from '../models/User';
import { server } from '../server';
import client from '../database';

const userStore = new UserStore();
const request = supertest(server);
let userToken = '';

describe('User tests', () => {
  beforeAll(async () => {
    const conn = await client.connect();
    const removeOrdersSql = 'DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n';
    const removeUsersSql = 'DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;\n';
    await conn.query(removeOrdersSql);
    await conn.query(removeUsersSql);
    conn.release();

    // Register a User and save the token
    const response = await request.post('/users/register').set('Content-type', 'application/json').send({
      firstName: 'Nuno',
      lastName: 'Soares',
      password: 'test123',
    });

    userToken = response.body;
  });

  describe('Test methods exist', () => {
    it('Index method should exist', () => {
      expect(userStore.index).toBeDefined();
    });

    it('getById method should exist', () => {
      expect(userStore.getById).toBeDefined();
    });

    it('Register method should exist', () => {
      expect(userStore.register).toBeDefined();
    });

    it('Login method should exist', () => {
      expect(userStore.login).toBeDefined();
    });

    it('Edit method should exist', () => {
      expect(userStore.edit).toBeDefined();
    });

    it('Delete method should exist', () => {
      expect(userStore.delete).toBeDefined();
    });
  });

  describe('Test methods return correct values', () => {
    it('Index method should return array of Users', async () => {
      const result = await userStore.index();
      expect(result).toContain(
        jasmine.objectContaining({
          id: 1,
          firstname: 'Nuno',
          lastname: 'Soares',
        }),
      );
    });

    it('Register method should return a token', async () => {
      let mockRes = {
        res: {
          json: function (token: string) {
            return token;
          },
        },
      };
      const result = await userStore.register(mockRes.res as unknown as Response, { firstName: 'Quim', lastName: 'Barreiros', password: 'test1234' });
      expect(result).toBeInstanceOf(String);
    });

    it('Login method should return a token', async () => {
      let mockRes = {
        res: {
          json: function (token: string) {
            return token;
          },
        },
      };
      const result = await userStore.register(mockRes.res as unknown as Response, { firstName: 'Zé', lastName: 'Manuel', password: 'test1234ze' });
      expect(result).toBeInstanceOf(String);
    });

    it('getById method should return user with ID', async () => {
      const result = await userStore.getById(1);
      expect(result).toEqual(
        jasmine.objectContaining({
          firstname: 'Nuno',
          lastname: 'Soares',
        }),
      );
    });

    it('Edit method should return a message "User edited with success"', async () => {
      const fakeRequest = {
        req: {
          params: {
            id: 1,
          },
          body: {
            firstName: 'João',
          },
        },
      };
      const result = await userStore.edit(fakeRequest.req as unknown as Request);
      expect(result).toEqual('User edited with success');
    });

    it('Delete method should return a message "User deleted with success"', async () => {
      const result = await userStore.delete(1 as unknown as { id: number });
      expect(result).toEqual('User deleted with success');
    });
  });

  describe('Test API Endpoints', () => {
    it('Check if server runs, should return 200 status', async () => {
      const response = await request.get('/users').set('Authorization', 'Bearer ' + userToken);
      expect(response.status).toBe(200);
    });

    it('Test Index should return array of users', async () => {
      const response = await request.get('/users').set('Authorization', 'Bearer ' + userToken);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        jasmine.objectContaining({
          firstname: 'Quim',
          lastname: 'Barreiros',
        }),
        jasmine.objectContaining({
          firstname: 'Zé',
          lastname: 'Manuel',
        }),
        jasmine.objectContaining({
          firstname: 'João',
          lastname: 'Soares',
        }),
      ]);
    });

    it('Test Index should return 401 when no userToken is provided', async () => {
      const response = await request.get('/users');
      expect(response.status).toBe(401);
    });

    it('Test getById should return user with id when a valid id is provided', async () => {
      const response = await request.get('/users/1').set('Authorization', 'Bearer ' + userToken);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        jasmine.objectContaining({
          firstname: 'João',
          lastname: 'Soares',
        }),
      );
    });

    it('Test getById should return the message "Theres no user by id 4" when a invalid id is provided', async () => {
      const response = await request.get('/users/4').set('Authorization', 'Bearer ' + userToken);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        jasmine.objectContaining({
          message: 'Theres no user by id 4',
        }),
      );
    });

    it('Test getById should return 401 when no userToken is provided', async () => {
      const response = await request.get('/users/1');
      expect(response.status).toBe(401);
    });

    it('Test Register should return token and status 200', async () => {
      const response = await request.post('/users/register').send({
        firstName: 'Lebron',
        lastName: 'James',
        password: 'lebron123',
      });
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(String);
    });

    it('Test Login should return token and status 200', async () => {
      const response = await request.post('/users/login').send({
        firstName: 'Lebron',
        lastName: 'James',
        password: 'lebron123',
      });
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(String);
    });

    it('Test update user should return a message "User edited with success"', async () => {
      const response = await request
        .put('/users/1')
        .set('Authorization', 'Bearer ' + userToken)
        .send({ firstName: 'Nuno' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        jasmine.objectContaining({
          message: 'User edited with success',
        }),
      );
    });

    it('Test update user should return status 401 when no userToken is provided', async () => {
      const response = await request.put('/users/2').send({ firstName: 'Nuno' });
      expect(response.status).toBe(401);
    });

    it('Test delete user should return a message "User deleted with success"', async () => {
      const response = await request.delete('/users/2').set('Authorization', 'Bearer ' + userToken);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        jasmine.objectContaining({
          message: 'User deleted with success',
        }),
      );
    });

    it('Test delete user should return status 401 when no userToken is provided', async () => {
      const response = await request.delete('/users/2');
      expect(response.status).toBe(401);
    });
  });
});
