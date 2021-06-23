USE businessDB;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", "Sales Lead", "Sales", 100000, "Ashley Rodriguez"),
("Mike", "Chan", "Salesperson", "Sales", 80000, "John Doe"),
("Ashley", "Rodriguez", "Lead Engineer", "Engineering", 150000, null),
("Kevin", "Tupik", "Software Engineer", "Engineering", 120000, "Ashley Rodriguez"),
("Malia", "Brown", "Accountant", "Finance", 125000, null),
("Sarah", "Lourd", "Legal Team Lead", "Legal", 250000, null),
("Tom", "Allen", "Lawyer", "Legal", 190000, "Sarah Lourd"),
("Christian", "Eckenrode", "Lead Engineer", "Engineering", 150000, "Mike Chan"),
("Tammer", "Galal", "Software Engineer", "Engineering", 120000, "Kevin Tupik");