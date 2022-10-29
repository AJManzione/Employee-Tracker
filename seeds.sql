INSERT INTO department (id, name)
VALUES 
    ( 001, "Engineering"),
    ( 002, "Finance"),
    ( 003, "Legal"),
    ( 004, "Sales");


INSERT INTO role (id, title, salary)
VALUES 
    ( 001, "Sales Lead", 100000),
    ( 002, "Salesperson", 80000),
    ( 003, "Lead Engineer", 150000),
    ( 004, "Software Engineer", 120000),
    ( 005, "Account Manager", 160000),
    ( 006, "Accountant", 125000),
    ( 007, "Legal Team Lead", 250000),
    ( 008, "Lawyer", 190000);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    ( 001, "Anthony", "Manzione", 008, 100);

