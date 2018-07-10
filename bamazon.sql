CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price INTEGER(100) NOT NULL,
stock_quantity INTEGER(100) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUES 
("tshirt", "clothing", "20.00", "80"),
("joggers", "clothing", "40.00", "60"),
("jeans", "clothing", "60.00", "50"),
("jackets", "clothing", "100.00", "25"),
("hats", "accessories", "20.00", "20"),
("rims", "automotive", "245.00", "16"),
("tires", "automotive", "110.00", "16"),
("tupperware", "kitchen", "5.00", "40"),
("pan", "kitchen", "25.00", "20"),
("belt", "accessories", "10.00", "4");