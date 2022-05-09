import supertest from 'supertest';
import { Request } from 'express';
import { Store as OrderStore } from '../models/Order';
import { server } from '../server';
import client from '../database';

const orderStore = new OrderStore();
const request = supertest(server);
let userToken = '';

describe('Order tests', () => {
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
      expect(orderStore.index).toBeDefined();
    });

    it('IndexCompletedByUser method should exist', () => {
      expect(orderStore.indexCompletedByUser).toBeDefined();
    });

    it('IndexCurrentByUser method should exist', () => {
      expect(orderStore.indexCurrentByUser).toBeDefined();
    });

    it('getById method should exist', () => {
      expect(orderStore.getById).toBeDefined();
    });

    it('addProduct method should exist', () => {
      expect(orderStore.addProduct).toBeDefined();
    });

    it('editProduct method should exist', () => {
      expect(orderStore.editProduct).toBeDefined();
    });

    it('deleteProduct method should exist', () => {
      expect(orderStore.deleteProduct).toBeDefined();
    });

    it('Create method should exist', () => {
      expect(orderStore.create).toBeDefined();
    });

    it('Update method should exist', () => {
      expect(orderStore.update).toBeDefined();
    });

    it('Delete method should exist', () => {
      expect(orderStore.delete).toBeDefined();
    });

    describe('Test methods return correct values', () => {
      it('Create method should return a Order', async () => {
        const result = await orderStore.create({ user_id: 1, status: false });
        expect(result).toEqual(
          jasmine.objectContaining({
            id: 1,
            user_id: '1',
            status: false,
          }),
        );
      });

      it('Index method should return array of Orders', async () => {
        const result = await orderStore.index();
        expect(result).toEqual([
          jasmine.objectContaining({
            order_id: 1,
            user_id: 1,
            firstname: 'Nuno',
            lastname: 'Soares',
            products: [],
            complete: false,
          }),
        ]);
      });

      it('IndexCurrentByUser method should return array of Orders', async () => {
        const result = await orderStore.indexCurrentByUser(1);
        expect(result).toEqual([
          jasmine.objectContaining({
            order_id: 1,
            user_id: 1,
            firstname: 'Nuno',
            lastname: 'Soares',
            products: [],
            complete: false,
          }),
        ]);
      });

      it('getById method should return order with ID', async () => {
        const result = await orderStore.getById(1);
        expect(result).toEqual([
          jasmine.objectContaining({
            order_id: 1,
            user_id: 1,
            firstname: 'Nuno',
            lastname: 'Soares',
            products: [],
            complete: false,
          }),
        ]);
      });

      it('Update method should return a message "Order edited with success"', async () => {
        const fakeRequest = {
          req: {
            params: {
              id: 1,
            },
            body: {
              status: true,
            },
          },
        };
        const result = await orderStore.update(fakeRequest.req as unknown as Request);
        expect(result).toEqual('Order edited with success');
      });

      it('IndexCompletedByUser method should return array of Orders', async () => {
        const result = await orderStore.indexCompletedByUser(1);
        expect(result).toEqual([
          jasmine.objectContaining({
            order_id: 1,
            user_id: 1,
            firstname: 'Nuno',
            lastname: 'Soares',
            products: [],
            complete: true,
          }),
        ]);
      });

      it('Delete method should return a message "Order deleted with success"', async () => {
        const result = await orderStore.delete({ id: 1 });
        expect(result).toEqual('Order deleted with success');
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
          const response = await request.get('/orders').set('Authorization', 'Bearer ' + userToken);
          expect(response.status).toBe(200);
        });

        it('Test Create should return created Order and status 201', async () => {
          const response = await request
            .post('/orders')
            .set('Authorization', 'Bearer ' + userToken)
            .send({
              user_id: 1,
              status: false,
            });
          expect(response.status).toBe(201);
          expect(response.body).toEqual(
            jasmine.objectContaining({
              user_id: '1',
              status: false,
            }),
          );
        });

        it('Test Index should return array of orders', async () => {
          const response = await request.get('/orders').set('Authorization', 'Bearer ' + userToken);
          expect(response.status).toBe(200);
          expect(response.body).toEqual([
            jasmine.objectContaining({
              order_id: 2,
              user_id: 1,
              firstname: 'Nuno',
              lastname: 'Soares',
              products: [],
              complete: false,
            }),
          ]);
        });

        it('Test getById should return orders with id when a valid id is provided', async () => {
          const response = await request.get('/orders/2').set('Authorization', 'Bearer ' + userToken);
          expect(response.status).toBe(200);
          expect(response.body).toEqual(
            jasmine.objectContaining([
              {
                order_id: 2,
                user_id: 1,
                firstname: 'Nuno',
                lastname: 'Soares',
                products: [],
                complete: false,
              },
            ]),
          );
        });

        it('Test getById should return the message "Theres no order by id 3" when a invalid id is provided', async () => {
          const response = await request.get('/orders/3').set('Authorization', 'Bearer ' + userToken);
          expect(response.status).toBe(200);
          expect(response.body).toEqual(
            jasmine.objectContaining({
              message: 'Theres no order by id 3',
            }),
          );
        });

        it('Test Create should return status 401 when no userToken is provided', async () => {
          const response = await request.post('/orders').send({
            id: 1,
            user_id: '1',
            status: true,
          });
          expect(response.status).toBe(401);
        });

        it('Test add product to order', async () => {
          // create a product first
          const product = await request
            .post('/products')
            .set('Authorization', 'Bearer ' + userToken)
            .send({
              name: 'Product 1',
              price: 180,
              category_id: null,
            });
          // add product to order
          const response = await request
            .post('/orders/2/product')
            .set('Authorization', 'Bearer ' + userToken)
            .send({ product_id: 1, quantity: 2 });
          expect(response.status).toBe(201);
          expect(response.body).toEqual(
            jasmine.objectContaining({
              order_id: '2',
              product_id: '1',
              quantity: 2,
            }),
          );
        });

        it('Test remove product from order', async () => {
          const response = await request.delete('/orders/2/product/1').set('Authorization', 'Bearer ' + userToken);
          expect(response.status).toBe(200);
          expect(response.body).toEqual(
            jasmine.objectContaining({
              message: 'Order deleted with success',
            }),
          );
        });

        it('Test edit order should return a message "Order edited with success"', async () => {
          const response = await request
            .put('/orders/2')
            .set('Authorization', 'Bearer ' + userToken)
            .send({ status: true });
          expect(response.status).toBe(200);
          expect(response.body).toEqual(
            jasmine.objectContaining({
              message: 'Order edited with success',
            }),
          );
        });

        it('Test edit order should return status 401 when no userToken is provided', async () => {
          const response = await request.put('/orders/2').send({ status: true });
          expect(response.status).toBe(401);
        });

        it('Test delete order should return a message "Order deleted with success"', async () => {
          const response = await request.delete('/orders/2').set('Authorization', 'Bearer ' + userToken);
          expect(response.status).toBe(200);
          expect(response.body).toEqual(
            jasmine.objectContaining({
              message: 'Order deleted with success',
            }),
          );
        });

        it('Test delete order should return status 401 when no userToken is provided', async () => {
          const response = await request.delete('/orders/2');
          expect(response.status).toBe(401);
        });
      });
    });
  });
});
