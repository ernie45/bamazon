DROP DATABASE IF EXISTS bamazon1;
CREATE DATABASE bamazon1;
USE bamazon1;
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT, 
    PRIMARY KEY(item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tablet", "electronics", "99.00", "35");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks", "clothing", "8.75", "100");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirt", "clothing", "45.90", "15");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "clothing", "25.90", "5");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wrench", "tools", "15.98", "47");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("screwdriver", "tools", "5.68", "24");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hammer", "tools", "30.00", "9");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sandwich", "food", "5.99", "200");
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("phone", "electronics", "599.32", "20");