import supertest from 'supertest';
import { Store as CategoryStore } from '../models/Category';
import { server } from '../server';
import client from '../database';

const categoryStore = new CategoryStore();
const request = supertest(server);

describe('Category Store', () => {
  describe('Test methods exist', () => {
    it('Index method should exist', () => {
      expect(categoryStore.index).toBeDefined();
    });

    it('Get by id method should exist', () => {
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
});
