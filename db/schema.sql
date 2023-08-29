DROP DATABASE IF EXISTS employee_database;
CREATE DATABASE employee_database;
USE employee_database;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30)
)
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    )
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
)