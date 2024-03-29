import { Request } from 'express';
import Client from '../database';
import { Order, CreateOrderDTO, DeleteOrderDTO, AddProductToOrderDTO, EditProductToOrderDTO, DeleteProductToOrderDTO } from '../interfaces/index';
import { orderMessages } from '../helpers/messages';

export class Store {
  async index(): Promise<Order[]> {
    try {
      const db_connection = await Client.connect();
      const sql = `SELECT o.id AS order_id, u.id as user_id, u.firstName, u.lastName,
         COALESCE(JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name,
        'price', p.price, 'quantity', op.quantity, 'category_id', c.id, 'category_name', c.name))
        FILTER (WHERE p.id IS NOT NULL), '[]') AS products,
        o.status AS complete FROM orders AS o LEFT JOIN orders_products AS op
        ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id
        LEFT JOIN categories AS c ON c.id = p.category_id
        LEFT JOIN users AS u ON u.id = o.user_id GROUP BY o.id, u.firstName,
        u.lastName, o.status, u.id ORDER BY o.id`;
      const orders = await db_connection.query(sql);
      db_connection.release();
      return orders.rows;
    } catch (error: unknown) {
      throw new Error(orderMessages.getOrdersFail(error as unknown as string));
    }
  }

  async indexCurrentByUser(id: number): Promise<Order[]> {
    try {
      const db_connection = await Client.connect();
      const sql = `SELECT o.id AS order_id, u.id as user_id, u.firstName, u.lastName,
         COALESCE(JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name,
        'price', p.price, 'quantity', op.quantity, 'category_id', c.id, 'category_name', c.name))
        FILTER (WHERE p.id IS NOT NULL), '[]') AS products,
        o.status AS complete FROM orders AS o LEFT JOIN orders_products AS op
        ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id
        LEFT JOIN categories AS c ON c.id = p.category_id
        LEFT JOIN users AS u ON u.id = o.user_id WHERE u.id = $1 AND o.status = false GROUP BY o.id, u.firstName,
        u.lastName, o.status, u.id ORDER BY o.id`;
      const orders = await db_connection.query(sql, [id]);
      db_connection.release();
      return orders.rows;
    } catch (error: unknown) {
      throw new Error(orderMessages.getOrdersFail(error as unknown as string));
    }
  }

  async indexCompletedByUser(id: number): Promise<Order[]> {
    try {
      const db_connection = await Client.connect();
      const sql = `SELECT o.id AS order_id, u.id as user_id, u.firstName, u.lastName,
         COALESCE(JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name,
        'price', p.price, 'quantity', op.quantity, 'category_id', c.id, 'category_name', c.name))
        FILTER (WHERE p.id IS NOT NULL), '[]') AS products,
        o.status AS complete FROM orders AS o LEFT JOIN orders_products AS op
        ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id
        LEFT JOIN categories AS c ON c.id = p.category_id
        LEFT JOIN users AS u ON u.id = o.user_id WHERE u.id = $1 AND o.status = true GROUP BY o.id, u.firstName,
        u.lastName, o.status, u.id ORDER BY o.id`;
      const orders = await db_connection.query(sql, [id]);
      db_connection.release();
      return orders.rows;
    } catch (error: unknown) {
      throw new Error(orderMessages.getOrdersFail(error as unknown as string));
    }
  }

  async getById(id: number): Promise<Order[]> {
    try {
      const db_connection = await Client.connect();
      const sql = `SELECT o.id AS order_id, u.id as user_id, u.firstName, u.lastName,
      COALESCE(JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name,
      'price', p.price, 'quantity', op.quantity, 'category_id', c.id, 'category_name', c.name))
      FILTER (WHERE p.id IS NOT NULL), '[]') AS products,
      o.status AS complete FROM orders AS o Left JOIN orders_products AS op
      ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id
      LEFT JOIN categories AS c ON c.id = p.category_id
      LEFT JOIN users AS u ON u.id = o.user_id WHERE o.id = $1
      GROUP BY o.id, u.firstName, u.lastName, o.status, u.id ORDER BY o.id`;
      const order = await db_connection.query(sql, [id]);
      db_connection.release();
      return order.rows;
    } catch (error: unknown) {
      throw new Error(orderMessages.getOrderFail(error as unknown as string));
    }
  }

  async create({ user_id, status }: CreateOrderDTO): Promise<Order> {
    try {
      const db_connection = await Client.connect();
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const newOrder = await db_connection.query(sql, [user_id, status]);
      db_connection.release();
      return newOrder.rows[0];
    } catch (error: unknown) {
      throw new Error(orderMessages.createOrderFail(error as unknown as string));
    }
  }

  async update(req: Request): Promise<string> {
    const requestBodyParams = Object.keys(req.body);
    const id = req.params.id;

    if (requestBodyParams.length === 0) {
      throw new Error(orderMessages.provideAtLeastOneParam);
    }

    try {
      const db_connection = await Client.connect();
      /* 
        The api user can provide one param or more.
        If the user provide only one param we need to remove the ',' otherwise the sql fails.
      */
      let sql = `UPDATE orders SET ${requestBodyParams.includes('user_id') ? `user_id = '${req.body['user_id']}', ` : ''} ${
        requestBodyParams.includes('status') ? `status = ${req.body['status']}` : ''
      } where id = ${id}`;

      if (requestBodyParams.length < 1) {
        sql = sql.replace(',', '');
      }
      await db_connection.query(sql);
      db_connection.release();
      return orderMessages.editWithSuccess;
    } catch (error: unknown) {
      throw new Error(orderMessages.editOrderFail(error as unknown as string));
    }
  }

  async delete({ id }: DeleteOrderDTO): Promise<string> {
    /* Before we try to delete a order we need to delete first all products associated with the order on
     ** the orders_products table.
     */
    try {
      const db_connection = await Client.connect();
      const deleteProductsFromOrderSql = 'DELETE FROM orders_products WHERE order_id=$1';
      await db_connection.query(deleteProductsFromOrderSql, [id]);
      const deleteOrderSql = 'DELETE FROM orders WHERE id = $1';
      await db_connection.query(deleteOrderSql, [id]);
      db_connection.release();
      return orderMessages.deletedWithSuccess;
    } catch (error: unknown) {
      throw new Error(orderMessages.deleteOrderFail(error as unknown as string));
    }
  }

  async addProduct({ id, product_id, quantity }: AddProductToOrderDTO): Promise<Order> {
    try {
      const db_connection = await Client.connect();
      const sql = 'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      const newProduct = await db_connection.query(sql, [id, product_id, quantity]);
      db_connection.release();
      return newProduct.rows[0];
    } catch (error: unknown) {
      throw new Error(orderMessages.createOrderFail(error as unknown as string));
    }
  }

  async editProduct({ id, product_id, quantity }: EditProductToOrderDTO): Promise<Order> {
    try {
      const db_connection = await Client.connect();
      const sql = 'UPDATE orders_products SET order_id = $1, product_id = $2, quantity= $3 WHERE order_id=$1 AND product_id = $2';
      const editProduct = await db_connection.query(sql, [id, product_id, quantity]);
      db_connection.release();
      return editProduct.rows[0];
    } catch (error: unknown) {
      throw new Error(orderMessages.editOrderFail(error as unknown as string));
    }
  }

  async deleteProduct({ id, product_id }: DeleteProductToOrderDTO): Promise<string> {
    try {
      const db_connection = await Client.connect();
      const sql = 'DELETE FROM orders_products WHERE order_id=$1 AND product_id = $2';
      await db_connection.query(sql, [id, product_id]);
      db_connection.release();
      return orderMessages.deletedProductFromOrder;
    } catch (error: unknown) {
      throw new Error(orderMessages.deleteProductOrderFail(error as unknown as string));
    }
  }
}
