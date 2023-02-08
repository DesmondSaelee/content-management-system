ROP DATABASE IF EXISTS departmentRoles_db;
CREATE DATABASE movies_db;

USE departmentRoles_db;

CREATE TABLE department (
  id INT  PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT
    manager_id INT
);