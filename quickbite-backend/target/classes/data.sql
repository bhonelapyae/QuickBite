-- Clear existing data to avoid duplicates on application restart
TRUNCATE TABLE menu_items CASCADE;
TRUNCATE TABLE categories CASCADE;

INSERT INTO categories (name, description) VALUES ('Burger', 'Delicious burgers');
INSERT INTO categories (name, description) VALUES ('Pizza', 'Fresh pizzas');
INSERT INTO categories (name, description) VALUES ('Drinks', 'Refreshing beverages');
INSERT INTO categories (name, description) VALUES ('Desserts', 'Sweet treats');

INSERT INTO menu_items (name, description, price, available, image_url, category_id) 
VALUES ('Classic Burger', 'Juicy beef patty with lettuce and tomato', 8.99, true, 'https://via.placeholder.com/300', 1);
INSERT INTO menu_items (name, description, price, available, image_url, category_id) 
VALUES ('Cheese Burger', 'Beef patty with melted cheese', 9.99, true, 'https://via.placeholder.com/300', 1);
INSERT INTO menu_items (name, description, price, available, image_url, category_id) 
VALUES ('Pepperoni Pizza', 'Classic pepperoni pizza', 12.99, true, 'https://via.placeholder.com/300', 2);
INSERT INTO menu_items (name, description, price, available, image_url, category_id) 
VALUES ('Margherita Pizza', 'Fresh mozzarella and basil', 11.99, true, 'https://via.placeholder.com/300', 2);
INSERT INTO menu_items (name, description, price, available, image_url, category_id) 
VALUES ('Coke', '330ml Coca Cola', 2.99, true, 'https://via.placeholder.com/300', 3);
INSERT INTO menu_items (name, description, price, available, image_url, category_id) 
VALUES ('Iced Tea', 'Refreshing iced tea', 2.49, true, 'https://via.placeholder.com/300', 3);
INSERT INTO menu_items (name, description, price, available, image_url, category_id) 
VALUES ('Chocolate Cake', 'Rich chocolate cake', 4.99, true, 'https://via.placeholder.com/300', 4);
INSERT INTO menu_items (name, description, price, available, image_url, category_id) 
VALUES ('Vanilla Ice Cream', 'Creamy vanilla ice cream', 3.99, true, 'https://via.placeholder.com/300', 4);
