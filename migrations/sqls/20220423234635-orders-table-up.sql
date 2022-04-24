/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id bigInt REFERENCES users(id),
    status BOOLEAN
);