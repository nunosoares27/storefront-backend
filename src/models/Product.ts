import Client from '../database';
import { Product, CreateProductDTO } from '../interfaces/index';
import { productMessages } from '../helpers/messages';

export class Store {
  async index(): Promise<Product[]> {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM products';
      const products = await db_connection.query(sql);
      db_connection.release();
      return products.rows;
    } catch (error) {
      throw new Error(productMessages.getProductsFail(error));
    }
  }

  async getById(id: number): Promise<Product> {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM products where id = $1';
      const product = await db_connection.query(sql, [id]);
      db_connection.release();
      return product.rows[0];
    } catch (error) {
      throw new Error(productMessages.getProductFail(error));
    }
  }

  async create({ name, price, category_id }: CreateProductDTO): Promise<Product> {
    try {
      const db_connection = await Client.connect();
      const sql = 'INSERT INTO products (name, price, category_id) VALUES($1, $2, $3) RETURNING *';
      const newProduct = await db_connection.query(sql, [name, price, category_id]);
      db_connection.release();
      return newProduct.rows[0];
    } catch (error) {
      throw new Error(productMessages.createProductFail(error));
    }
  }
}
