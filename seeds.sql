USE businessDB;

INSERT INTO department (name)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");


INSERT INTO employee_role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), 
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Lawyer", 190000, 4),
("Legal Team Lead", 250000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null), -- Use implied number based on order of values for manager_id
("Mike", "Chan", 1, null),
("Ashley", "Rodriguez", 2, null),
("Kevin", "Tupik", 2, null),
("Malia", "Brown", 3, null),
("Sarah", "Lourd", 4, null),
("Tom", "Allen", 4, null),
("Christian", "Eckenrode", 2, null),
("Tammer", "Galal", 2, null);