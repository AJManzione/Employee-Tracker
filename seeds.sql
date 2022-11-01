INSERT INTO department (name)
VALUE ("Sales"),
      ("Engineering"),
      ("Finance"),
      ("Legal");


INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2),
      ("Legal Team Lead", 250000, 4),
      ("Accountant", 125000, 3),
      ("Sales Lead", 100000, 1),
      ("Salesperson", 80000, 1),
      ("Software Engineer", 120000, 2),
      ("Lawyer", 190000, 4);


INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Anthony", "Manzione", null, 1),
      ("Rick", "Sanchez", null, 2),
      ("Morty","Smith",null,3),
      ("Beth", "Smith", 1, 4),
      ("Jerry", "Smith", 4, 5);

