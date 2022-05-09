import supertest from 'supertest';
import { Request } from 'express';
import { Store as ProductStore } from '../models/Product';
import { server } from '../server';
import client from '../database';

const productStore = new ProductStore();
const request = supertest(server);
let userToken = '';

describe('Product tests', () => {
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
      expect(productStore.index).toBeDefined();
    });

    it('getById method should exist', () => {
      expect(productStore.getById).toBeDefined();
    });

    it('productsByCategory method should exist', () => {
      expect(productStore.productsByCategory).toBeDefined();
    });

    it('Create method should exist', () => {
      expect(productStore.create).toBeDefined();
    });

    it('Update method should exist', () => {
      expect(productStore.update).toBeDefined();
    });

    it('Delete method should exist', () => {
      expect(productStore.delete).toBeDefined();
    });
  });

  describe('Test methods return correct values', () => {
    it('Create method should return a Product', async () => {
      const result = await productStore.create({ name: 'Product 1', price: 30 });
      expect(result).toEqual(
        jasmine.objectContaining({
          name: 'Product 1',
          price: 30,
          category_id: null,
        }),
      );
    });

    it('Index method should return array of Products with Product 1 on it', async () => {
      const result = await productStore.index();
      expect(result).toEqual([
        jasmine.objectContaining({
          name: 'Product 1',
          price: 30,
          category_id: null,
        }),
      ]);
    });

    it('getById method should return product with ID', async () => {
      const result = await productStore.getById(1);
      expect(result).toEqual(
        jasmine.objectContaining({
          id: 1,
          name: 'Product 1',
          price: 30,
          category_id: null,
        }),
      );
    });

    it('Update method should return a message "Product edited with success"', async () => {
      const fakeRequest = {
        req: {
          params: {
            id: 1,
          },
          body: {
            name: 'Product 1 edited',
          },
        },
      };
      const result = await productStore.update(fakeRequest.req as unknown as Request);
      expect(result).toEqual('Product edited with success');
    });

    it('Delete method should return a message "Product deleted with success"', async () => {
      const result = await productStore.delete({ id: 1 });
      expect(result).toEqual('Product deleted with success');
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
        const response = await request.get('/products');
        expect(response.status).toBe(200);
      });

      it('Test Create should return created Product and status 201', async () => {
        const response = await request
          .post('/products')
          .set('Authorization', 'Bearer ' + userToken)
          .send({
            name: 'Product 2',
            price: 80,
            category_id: null,
          });
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
          jasmine.objectContaining({
            name: 'Product 2',
            price: 80,
            category_id: null,
          }),
        );
      });

      it('Test Index should return array of products', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
          jasmine.objectContaining({
            name: 'Product 2',
            price: 80,
            category_id: null,
          }),
        ]);
      });

      it('Test getById should return products with id when a valid id is provided', async () => {
        const response = await request.get('/products/2');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          jasmine.objectContaining({
            name: 'Product 2',
            price: 80,
            category_id: null,
          }),
        );
      });

      it('Test getById should return the message "Theres no product by id 3" when a invalid id is provided', async () => {
        const response = await request.get('/products/3');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          jasmine.objectContaining({
            message: 'Theres no product by id 3',
          }),
        );
      });

      it('Test Create should return status 401 when no userToken is provided', async () => {
        const response = await request.post('/products').send({
          name: 'Product 3',
          price: 80,
          category_id: null,
        });
        expect(response.status).toBe(401);
      });

      it('Test edit product should return a message "Product edited with success"', async () => {
        const response = await request
          .put('/products/2')
          .set('Authorization', 'Bearer ' + userToken)
          .send({ name: 'Product 2 edited' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          jasmine.objectContaining({
            message: 'Product edited with success',
          }),
        );
      });

      it('Test edit product should return status 401 when no userToken is provided', async () => {
        const response = await request.put('/products/2').send({ name: 'Product 2 edited' });
        expect(response.status).toBe(401);
      });

      it('Test delete product should return a message "Product deleted with success"', async () => {
        const response = await request.delete('/products/2').set('Authorization', 'Bearer ' + userToken);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          jasmine.objectContaining({
            message: 'Product deleted with success',
          }),
        );
      });

      it('Test delete products should return status 401 when no userToken is provided', async () => {
        const response = await request.delete('/products/2');
        expect(response.status).toBe(401);
      });
    });
  });
});
