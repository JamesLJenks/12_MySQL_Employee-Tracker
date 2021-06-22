DROP DATABASE IF EXISTS business_DB;
CREATE database business_DB;

USE business_DB;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_role (
  id INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL (10, 4) NULL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee
