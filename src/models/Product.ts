import { Request } from 'express';
import Client from '../database';
import { Product, CreateProductDTO, DeleteProductDTO } from '../interfaces/index';
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

  async productsByCategory(id: number): Promise<Product[]> {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category_id = $1';
      const products = await db_connection.query(sql, [id]);
      db_connection.release();
      return products.rows;
    } catch (error) {
      throw new Error(productMessages.getProductsFail(error));
    }
  }

  async getById(id: number): Promise<Product> {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id = $1';
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

  async update(req: Request): Promise<string> {
    const requestBodyParams = Object.keys(req.body);
    const id = req.params.id;

    if (requestBodyParams.length === 0) {
      throw new Error(productMessages.provideAtLeastOneParam);
    }

    try {
      const db_connection = await Client.connect();
      /* 
        The api user can provide one param or more.
        If the user provide only one param we need to remove the ',' otherwise the sql fails.
      */
      let sql = `UPDATE products SET ${requestBodyParams.includes('name') ? `name = '${req.body['name']}', ` : ''} ${
        requestBodyParams.includes('price') ? `price = ${req.body['price']}, ` : ''
      } ${requestBodyParams.includes('category_id') ? `category_id = ${req.body['category_id']}` : ''} where id = ${id}`;

      if (requestBodyParams.length < 2) {
        sql = sql.replace(',', '');
      }
      await db_connection.query(sql);
      db_connection.release();
      return productMessages.editWithSuccess;
    } catch (error) {
      throw new Error(productMessages.editProductFail(error));
    }
  }

  async delete({ id }: DeleteProductDTO): Promise<string> {
    try {
      const db_connection = await Client.connect();
      const sql = 'DELETE FROM products WHERE id = $1';
      await db_connection.query(sql, [id]);
      db_connection.release();
      return productMessages.deletedWithSuccess;
    } catch (error) {
      throw new Error(productMessages.deleteProductFail(error));
    }
  }
}
