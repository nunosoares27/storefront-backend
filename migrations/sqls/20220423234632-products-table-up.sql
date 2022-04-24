/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    price INTEGER NOT NULL,
    name VARCHAR(120) NOT NULL,
    category_id bigInt REFERENCES categories(id)
);