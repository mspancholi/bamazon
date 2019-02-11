DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2),
stock_quantity INT,
product_sales DECIMAL(10,2),
PRIMARY KEY (item_id)
);

 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Headphones", "Electronics", 50.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toothpaste", "Beauty", 2.50, 1000);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 1000.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jacket", "Apparel", 250.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter and the Deathly Hallows", "Books", 20.00, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sports", 25.00, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Matchbox Car", "Toys", 1.50, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sports", 30.00, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad", "Electronics", 1250.00, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Game of Thrones", "Books", 32.00, 100);


CREATE TABLE departments(
department_id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR (100) NOT NULL,
over_head_costs DECIMAL(10,2),
PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 4000.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Sports", 1500.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 1000.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Toys", 2000.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Beauty", 1000.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Apparel", 4000.00);





