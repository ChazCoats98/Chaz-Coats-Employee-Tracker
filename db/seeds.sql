INSERT INTO departments (name)
values ("Management"),
("Software Development"),
("Human Resources"),
("operations"),
("Interns");
INSERT INTO employees(first_name, last_name, role_id, manager_id) 
value ("J. Edgar", "Hoover", 1, 1),
("John", "Franklin", 2, 1),
("John", "Lee", 3, 1),
("Raoul", "Agent", 4, 1),
("Sonia", "Marmeladov", 5, 3),
("Hal", "Incandenza", 6, 2),
("Geordie", "Greep", 7, 3),
("Mary", "Hogarth", 8, 3),
("James", "Ray", 9, 4);


INSERT INTO roles(title, salary, department_id)
value ("CEO", 1200000, 1),
("Research Manager", 800000, 1),
("Development Manager", 600000, 1),
("Manager of Outside Resources", 500000, 1),
("Software Engineer", 130000, 2),
("Future Technologies Engineer", 190000, 2),
("Human Resources Manager", 110000, 3),
("Operations Engineer", 80000, 4),
("Patsy", 100000, 5);
