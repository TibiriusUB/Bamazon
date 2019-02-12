DROP DATABASE IF EXISTS bamazonDB;
CREATE database banmazonDB;
-- database scripting, and column justification
USE bamazonDB;

CREATE TABLE products (
-- Id incremental, unique, and by necessity, NOT NULL
  item_id INT AUTO_INCREMENT UNIQUE NOT NULL,
-- Name, basic descripton, NOT NULL, but not unique
  product_name VARCHAR(100) NOT NULL,
-- price, even if 0, NOT NULL
  price DECIMAL(10,4) NOT NULL,
-- department, can be NULL for test products and transition into new departments
  department_name VARCHAR(50) NULL,
-- quantity, like price, can be 0, but NOT NULL
  stock_quantity INT NOT NULL,
-- product sales, following price and quantity, for the same reasons, NOT NULL
  product_sales INT NOT NULL,
-- a descripton column couls be added here, and it would be NULL
-- a customer review aggrigate could be added here to go with a review option if added to the customer client.
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
-- Id incremental, unique, and by necessity, NOT NULL
  department_id INT AUTO_INCREMENT UNIQUE NOT NULL,
-- Name, basic descripton needed, NOT NULL, and unique to maintain distinct department identity. 
  department_name VARCHAR(100) UNIQUE NOT NULL,
-- overhead cost, even if 0, NOT NULL
  over_head_costs DECIMAL(20,4) NOT NULL,

  PRIMARY KEY (department_id)
);

