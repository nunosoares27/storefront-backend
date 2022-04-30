import { Request } from 'express';
import Client from '../database';
import { Order, CreateOrderDTO, DeleteOrderDTO } from '../interfaces/index';
import { orderMessages } from '../helpers/messages';

export class Store {
  async index(): Promise<Order[]> {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const orders = await db_connection.query(sql);
      db_connection.release();
      return orders.rows;
    } catch (error) {
      throw new Error(orderMessages.getOrdersFail(error));
    }
  }

  async getById(id: number): Promise<Order> {
    try {
      const db_connection = await Client.connect();
      const sql = 'SELECT * FROM orders where id = $1';
      const order = await db_connection.query(sql, [id]);
      db_connection.release();
      return order.rows[0];
    } catch (error) {
      throw new Error(orderMessages.getOrderFail(error));
    }
  }

  async create({ user_id, status }: CreateOrderDTO): Promise<Order> {
    try {
      const db_connection = await Client.connect();
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const newOrder = await db_connection.query(sql, [user_id, status]);
      db_connection.release();
      return newOrder.rows[0];
    } catch (error) {
      throw new Error(orderMessages.createOrderFail(error));
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
    } catch (error) {
      throw new Error(orderMessages.editOrderFail(error));
    }
  }

  async delete({ id }: DeleteOrderDTO): Promise<string> {
    try {
      const db_connection = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id = $1';
      await db_connection.query(sql, [id]);
      db_connection.release();
      return orderMessages.deletedWithSuccess;
    } catch (error) {
      throw new Error(orderMessages.deleteOrderFail(error));
    }
  }
}
