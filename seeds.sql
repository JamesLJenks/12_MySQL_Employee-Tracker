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
VALUES ("John", "Doe", 1, 3),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, null),
("Kevin", "Tupik", 4, 3),
("Malia", "Brown", 5, null),
("Sarah", "Lourd", 7, null),
("Tom", "Allen", 6, 6),
("Christian", "Eckenrode", 2, 2),
("Tammer", "Galal", 3, 4);