INSERT INTO departments (name)
values ("Management"),
("Software Development"),
("Human Resources"),
("operations"),
("Interns");
INSERT INTO employees(first_name, last_name, role_id, manager_id) 
values ("J. Edgar", "Hoover", 1, 1)
("John", "Franklin", 2, 1),
("John", "Lee", 2, 1),
("Raoul", "Agent", 2, 1),
("Sonia", "Marmeladov", 2, 3),
("Hal", "Incandenza", 2, 2),
("Geordie", "Greep", 3, 3),
("Mary", "Hogarth", 4, 3),
("James", "Ray", 5, 4);


INSERT INTO roles(title, salary, department_id)
values ("CEO", 1200000, 1),
("Research Manager", 800000, 1),
("Operations and Development Manager", 600000, 1),
("Manager of Outside Resources", 500000, 1),
("Software Engineer", 130000, 2),
("Future Technologies Engineer", 190000, 2),
("Human Resources Manager", 110000, 3),
("Operations Engineer", 80000, 4),
("Patsy", 100000, 5);
