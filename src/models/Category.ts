import Client from '../database';
import { Category, CreateCategoryDTO, EditCategoryDTO, DeleteCategoryDTO } from '../interfaces/index';
import { categoryMessages } from '../helpers/messages';

export class Store {
  async index(): Promise<Category[]> {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM categories';
      const categories = await db_connection.query(sql);
      db_connection.release();
      return categories.rows;
    } catch (error) {
      throw new Error(categoryMessages.getCategoriesFail(error));
    }
  }

  async getById(id: number): Promise<Category> {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM categories where id = $1';
      const category = await db_connection.query(sql, [id]);
      db_connection.release();
      return category.rows[0];
    } catch (error) {
      throw new Error(categoryMessages.getCategoryFail(error));
    }
  }

  async create(name: CreateCategoryDTO): Promise<Category> {
    try {
      const db_connection = await Client.connect();
      const sql = 'INSERT INTO categories (name) VALUES($1) RETURNING *';
      const newCategory = await db_connection.query(sql, [name]);
      db_connection.release();
      return newCategory.rows[0];
    } catch (error) {
      throw new Error(categoryMessages.createCategoryFail(error));
    }
  }

  async update({ id, name }: EditCategoryDTO): Promise<string> {
    try {
      const db_connection = await Client.connect();
      const sql = 'UPDATE categories SET name = $1 where id = $2';
      const updateCategory = await db_connection.query(sql, [name, id]);
      db_connection.release();
      return categoryMessages.editWithSuccess;
    } catch (error) {
      throw new Error(categoryMessages.editCategoryFail(error));
    }
  }

  async delete({ id }: DeleteCategoryDTO): Promise<string> {
    try {
      const db_connection = await Client.connect();
      const sql = 'DELETE FROM categories WHERE id = $1';
      await db_connection.query(sql, [id]);
      db_connection.release();
      return categoryMessages.deletedWithSuccess;
    } catch (error) {
      throw new Error(categoryMessages.deleteCategoryFail(error));
    }
  }
}
