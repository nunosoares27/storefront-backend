import supertest from 'supertest';
import { Store as CategoryStore } from '../models/Category';
import { server } from '../server';
import client from '../database';

const categoryStore = new CategoryStore();
const request = supertest(server);
let userToken = '';

describe('Category tests', () => {
  beforeAll(async () => {
    const conn = await client.connect();
    const removeOrderProductsSql = 'DELETE FROM orders_products; ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;\n';
    const removeProductsSql = 'DELETE FROM products; ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
    const removeCategoriesSql = 'DELETE FROM categories; ALTER SEQUENCE categories_id_seq RESTART WITH 1;\n';
    await conn.query(removeOrderProductsSql);
    await conn.query(removeProductsSql);
    await conn.query(removeCategoriesSql);
    conn.release();
  });

  describe('Test methods exist', () => {
    it('Index method should exist', () => {
      expect(categoryStore.index).toBeDefined();
    });

    it('getById method should exist', () => {
      expect(categoryStore.getById).toBeDefined();
    });

    it('Create method should exist', () => {
      expect(categoryStore.create).toBeDefined();
    });

    it('Update method should exist', () => {
      expect(categoryStore.update).toBeDefined();
    });

    it('Delete method should exist', () => {
      expect(categoryStore.delete).toBeDefined();
    });
  });

  describe('Test methods return correct values', () => {
    it('Create method should return a Category', async () => {
      const result = await categoryStore.create('Category test' as unknown as { name: string });
      expect(result).toEqual(
        jasmine.objectContaining({
          name: 'Category test',
        }),
      );
    });

    it('Index method should return array of Categories with Category test on it', async () => {
      const result = await categoryStore.index();
      expect(result).toEqual([
        jasmine.objectContaining({
          name: 'Category test',
        }),
      ]);
    });

    it('getById method should return category with ID', async () => {
      const result = await categoryStore.getById(1);
      expect(result).toEqual(
        jasmine.objectContaining({
          name: 'Category test',
        }),
      );
    });

    it('Update method should return a message "Category edited with success"', async () => {
      const result = await categoryStore.update({
        id: 1,
        name: 'Category test edited',
      });
      expect(result).toEqual('Category edited with success');
    });

    it('Delete method should return a message "Category deleted with success"', async () => {
      const result = await categoryStore.delete(1 as unknown as { id: number });
      expect(result).toEqual('Category deleted with success');
    });
  });

  describe('Test API Endpoints', () => {
    beforeAll(async () => {
      'Register user and get token. We need this to access the protected routes';
      const response = await request.post('/users/register').set('Content-type', 'application/json').send({
        firstName: 'Nuno',
        lastName: 'Soares',
        password: 'test123',
      });
      expect(response.status).toBe(200);

      userToken = response.body;
    });

    it('Check if server runs, should return 200 status', async () => {
      const response = await request.get('/categories');
      expect(response.status).toBe(200);
    });

    it('Test Index should return array of categories', async () => {
      const response = await request.get('/categories');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        jasmine.objectContaining({
          name: 'Category test edited',
        }),
      ]);
    });

    it('Test getById should return category with id when a valid id is provided', async () => {
      const response = await request.get('/categories/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        jasmine.objectContaining({
          name: 'Category test edited',
        }),
      );
    });

    it('Test getById should return the message "Theres no category by id 3" when a invalid id is provided', async () => {
      const response = await request.get('/categories/3');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        jasmine.objectContaining({
          message: 'Theres no category by id 3',
        }),
      );
    });

    it('Test Create should return created Category and status 201', async () => {
      const response = await request
        .post('/categories')
        .set('Authorization', 'Bearer ' + userToken)
        .send({
          name: 'Category Endpoint test',
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        jasmine.objectContaining({
          name: 'Category Endpoint test',
        }),
      );
    });

    it('Test Create should return status 401 when no userToken is provided', async () => {
      const response = await request.post('/categories').send({
        name: 'Category Endpoint test 2',
      });
      expect(response.status).toBe(401);
    });

    it('Test edit category should return a message "Category edited with success"', async () => {
      const response = await request
        .put('/categories/2')
        .set('Authorization', 'Bearer ' + userToken)
        .send({ name: 'Category Endpoint test edited' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        jasmine.objectContaining({
          message: 'Category edited with success',
        }),
      );
    });

    it('Test edit category should return status 401 when no userToken is provided', async () => {
      const response = await request.put('/categories/2').send({ name: 'Category Endpoint test edited' });
      expect(response.status).toBe(401);
    });

    it('Test delete category should return a message "Category deleted with success"', async () => {
      const response = await request.delete('/categories/2').set('Authorization', 'Bearer ' + userToken);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        jasmine.objectContaining({
          message: 'Category deleted with success',
        }),
      );
    });

    it('Test delete category should return status 401 when no userToken is provided', async () => {
      const response = await request.delete('/categories/2');
      expect(response.status).toBe(401);
    });
  });
});
