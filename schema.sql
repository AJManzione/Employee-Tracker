DROP DATABASE employee_db IF EXISTS
CREATE employee_db

USE employee_db

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL

);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT 
);