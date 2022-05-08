import supertest from 'supertest';
import { Store as CategoryStore } from '../models/Category';
import { server } from '../server';
import client from '../database';

const categoryStore = new CategoryStore();
const request = supertest(server);

describe('Category Store', () => {
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
});
