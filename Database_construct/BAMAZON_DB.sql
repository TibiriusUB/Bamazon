DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;
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

INSERT INTO products (product_name,price,department_name,stock_quantity,product_sales) VALUES('vitamins',10.00,'health_products',2500,0);
INSERT INTO products (product_name,price,department_name,stock_quantity,product_sales) VALUES('kibble',15.00,'petcare',4000,0);
INSERT INTO products (product_name,price,department_name,stock_quantity,product_sales) VALUES('gamestaion-x',499.99,'entertainment_electronic',500,0);
INSERT INTO products (product_name,price,department_name,stock_quantity,product_sales) VALUES('fauxnopoly',24.99,'entertainment_physical',2500,0);
INSERT INTO products (product_name,price,department_name,stock_quantity,product_sales) VALUES('pizzabytes',8.99,'food',3000,0);
INSERT INTO products (product_name,price,department_name,stock_quantity,product_sales) VALUES('scribbleglue',4.99,'crafts',8000,0);
INSERT INTO products (product_name,price,department_name,stock_quantity,product_sales) VALUES('harrys_classroom',19.99,'education_electronic',1500,0);
INSERT INTO products (product_name,price,department_name,stock_quantity,product_sales) VALUES('chemestry_101',50.00,'education_physical',3000,0);
INSERT INTO products (product_name,price,department_name,stock_quantity,product_sales) VALUES('monalisa_prints',32.98,'art',2000,0);
INSERT INTO products (product_name,price,department_name,stock_quantity,product_sales) VALUES('tuba',300.00,'music',2500,0);


INSERT INTO departments (department_name, over_head_costs) VALUES('health_products',2500);
INSERT INTO departments (department_name, over_head_costs) VALUES('petcare',4000);
INSERT INTO departments (department_name, over_head_costs) VALUES('entertainment_electronic',5000);
INSERT INTO departments (department_name, over_head_costs) VALUES('entertainment_physical',4500);
INSERT INTO departments (department_name, over_head_costs) VALUES('food',3000);
INSERT INTO departments (department_name, over_head_costs) VALUES('crafts',2000);
INSERT INTO departments (department_name, over_head_costs) VALUES('education_electronic',1500);
INSERT INTO departments (department_name, over_head_costs) VALUES('education_physical',3000);
INSERT INTO departments (department_name, over_head_costs) VALUES('art',2000);
INSERT INTO departments (department_name, over_head_costs) VALUES('music',2500);