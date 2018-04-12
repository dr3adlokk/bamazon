CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(80) NOT NULL,
department_name VARCHAR(80) NOT NULL,
price DECIMAL(11,2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL
);

INSERT INTO products (item_id, product_name, department, price, stock_quantity)
VALUES 
('001','Gibson Les Paul Custom', 'Guitars', 4999.99, 5),
('002','Gibson SG', 'Guitars', 1499.99, 3),
('003','Fender Jazzmaster', 'Guitars', 1299.99, 2),
('004','Fender Jazz Bass', 'Basses', 899.99, 4),
('005','G&L L-2000', 'Basses', 1299.99, 1),
('006','Ludwig Vistalite 3 Piece Drum Set', 'Drums', 1799.99, 3),
('007','Ludwig Maple 4 Piece Drum Set', 'Drums', 3999.99, 1),
('008','Marshall JCM 900', 'Guitar Amplifiers', 1199.99, 4),
('009','Orange Tiny Terror', 'Guitar Amplifiers', 799.99, 2),
('010','Ampeg V-4', 'Guitar Amplifiers', 599.99, 1);




