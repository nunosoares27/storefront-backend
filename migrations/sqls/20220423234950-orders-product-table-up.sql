/* Replace with your SQL commands */
CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id bigint REFERENCES orders(id),
    product_id bigInt REFERENCES products(id),
    quantity integer
);