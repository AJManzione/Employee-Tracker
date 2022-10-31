INSERT INTO department (department)
VALUES 
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Sales");


INSERT INTO role (title, salary, department_id)
VALUES 
    ("Sales Lead", 100000, 004),
    ("Salesperson", 80000, 004),
    ("Lead Engineer", 150000, 001),
    ("Software Engineer", 120000, 001);


INSERT INTO employee (first_name, last_name, role_id)
VALUES 
    ("Anthony", "Manzione", 001),
    ("Rick", "Sanchez", 002),
    ("Morty", "Smith", 003),
    ("Jerry", "Smith", 004);

