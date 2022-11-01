const inquirer = require('inquirer');
const cTable = require('console.table');
const { createPool } = require('mysql2');

// First function called runs the menu prompt
menuPrompt() 

// creates a pool (runs mysql)
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "123123321",
    database: "employee_db"
})

/* -------------------------------------------------------------------------- */
/*                                 Menu Prompt                                */
/* -------------------------------------------------------------------------- */

function menuPrompt() {
    inquirer
.prompt (
    [
        {
            type: 'list',
            message: "What would you like to do?",
            name: 'welcome',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Roles', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
            validate: (value) => { 
                if(value){return true} 
                else {return "Please make a selection"}
            }
        }
    ]
)
.then ((answer) => {
    let userAnswer = answer.welcome;
    
    if(!userAnswer) {
        console.log("You did not make a selection");
    } else if (userAnswer == "View All Employees") {
        viewAllEmployees();
    } else if (userAnswer == "Add Employee") {
        addEmployee();
    } else if (userAnswer == "Update Employee Roles") {
        updateEmployeeRole();
    } else if (userAnswer == "View All Roles") {
        viewAllRoles();
    } else if (userAnswer == "Add Role") {
        addRole();
    } else if (userAnswer == "View All Departments") {
        viewAllDepartments();
    } else if (userAnswer == "Add Department") {
        addDepartment();
    }   
})
}


/* -------------------------------------------------------------------------- */
/*                             View All Employees                             */
/* -------------------------------------------------------------------------- */

function viewAllEmployees() {
    pool.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",(err, res) => {
      if (err) throw err
      console.table(res)
    }); setTimeout(menuPrompt, 100);
    
    
}


/* -------------------------------------------------------------------------- */
/*                            View All Departments                            */
/* -------------------------------------------------------------------------- */

function viewAllDepartments() {

    pool.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err
        console.table(res);
    }); setTimeout(menuPrompt, 100);


}
/* -------------------------------------------------------------------------- */
/*                               View All Roles                               */
/* -------------------------------------------------------------------------- */


function viewAllRoles() {
    pool.query(`SELECT role.id, role.title, department.name, role.salary FROM employee_db.role INNER JOIN department ON department_id = department.id;`, (err, res) => {
        console.table(res);
        pool.end;
    }); setTimeout(menuPrompt, 100);
}



/* -------------------------------------------------------------------------- */
/*                            Update Employee Role                            */
/* -------------------------------------------------------------------------- */


function updateEmployeeRole() {
    let firstNames = [];
    let lastNames = [];
    let employeeNames = [];
    let allRoles = [];

    pool.execute(`SELECT first_name FROM employee_db.employee;`, (err, res) => {
        res.map(function({ first_name }) {firstNames.push(first_name)}); 
        pool.end;
    })

    pool.query(`SELECT role.title FROM employee_db.role;`, (err, res) => {
        res.map(function({ title }) {allRoles.push(title)});
        pool.end;
    });

    setTimeout(getLastNames, 100);
    function getLastNames() {
    pool.execute(`SELECT last_name FROM employee_db.employee;`, (err, res) => {
        res.map(function({ last_name }) {lastNames.push(last_name)}); 
        for(i = 0; i < firstNames.length; i++) {
            let first = firstNames[i].toString();
            let last = lastNames[i].toString();
            names = first + " " + last;
            employeeNames.push(names);
            pool.end;
        }
    })
    }


setTimeout(inquireUpdateER, 120);

let selectedEmployee = [];

function inquireUpdateER() {
inquirer
.prompt([{
    type: 'list',
    message: "Which employee role do you want to update?",
    name: 'updateEmployee',
    choices: employeeNames,
    validate: (value) => { 
        if(value){return true} 
        else {return "Please make a selection"}
    }
},
])
.then((answer) => {
    update = answer.updateEmployee;
    selectedEmployee.push(update);
    setTimeout(updateSelectedRole, 100);
})}



function updateSelectedRole() {
inquirer
.prompt([{
    type: 'list',
    message: `Which role do you want to assign to ${selectedEmployee}?`,
    name: 'newRole',
    choices: allRoles,
    validate: (value) => { 
        if(value){return true} 
        else {return "Please make a selection"}
    }

}])
.then((answer) => {
    let selectedRole = answer.newRole;
    let newRoleID = [];
    let id;
    let selectedFirstName;

    let newName = update.split(" ")
    selectedFirstName = newName[0];


    pool.execute(`SELECT role.id FROM employee_db.role WHERE title = "${selectedRole}";`, (err, res) => {
        res.map(function({ id }) {newRoleID.push(id)});
        id = newRoleID.toString()
        pool.end;
        setTimeout(changeRole, 100);
        
 
    function changeRole() {   
        pool.execute(`UPDATE employee_db.employee SET role_id = ${id} WHERE first_name = "${selectedFirstName}";`);
        console.log(`Successfully changed ${update} to ${selectedRole}`);
        pool.end;
        setTimeout(menuPrompt, 100);

    }
    })
})
}

}






/* -------------------------------------------------------------------------- */
/*                                Add Employee                                */
/* -------------------------------------------------------------------------- */


employeeRoles = []

function addEmployee() {
    
    pool.execute(`SELECT * FROM employee_db.role;`, (err, res) => {
        res.map(function({ title }) {employeeRoles.push(title)}); 
        pool.end;
    })

inquirer
.prompt([{
    type: 'input',
    message: "What is the employee's first name?",
    name: 'firstName',
    validate: (value) => { 
        if(value){return true} 
        else {return "Please make a selection"}
    }

},
{
    type: 'input',
    message: "What is the employee's last name?",
    name: 'lastName',
    validate: (value) => { 
        if(value){return true} 
        else {return "Please make a selection"}
    }

},
{
    type: 'list',
    message: "What is the employee's role",
    name: 'employeeRole',
    choices: employeeRoles,
    validate: (value) => { 
        if(value){return true} 
        else {return "Please make a selection"}
    }

}])
.then((answer) => {
    let firstName = answer.firstName;
    let lastName = answer.lastName;
    let employeeRole = answer.employeeRole;
    let roleId = []
    let id;


    pool.query(`SELECT id FROM employee_db.role WHERE title = '${employeeRole}';`, (err, res) => {
        res.map(function({ id }) {roleId.push(id)});
        id = roleId.toString()
        pool.end;
    })

    setTimeout(getEmployee, 100);

    function getEmployee() {
    pool.promise().query(`INSERT INTO employee_db.employee (first_name, last_name, role_id) VALUES ("${firstName}", "${lastName}", 00${id})`) 
    .then( () => {
        console.log(`Added ${firstName} ${lastName} to the database`)
        pool.end;
    }); setTimeout(menuPrompt, 100);
    }
})

}

/* -------------------------------------------------------------------------- */
/*                                  Add Role                                  */
/* -------------------------------------------------------------------------- */

let departments = [];

function addRole() {

    pool.query(`SELECT * FROM department;`, (err, res) => {
        res.map(function({ name }) {departments.push(name)});  
        pool.end;
    })

inquirer
.prompt([{
    type: 'input',
    message: 'What is the name of the role?',
    name: 'role',
    validate: (value) => { 
        if(value){return true} 
        else {return "Please enter a role name"}
    }
},
{
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'salary',
    validate: (value) => { 
        if(value){return true} 
        else {return "Please enter a salary"}
    }
},
{
    type: 'list',
    message: 'Which department does this role belong to?',
    name: 'whichDepartment',
    choices: departments,
    validate: (value) => { 
        if(value){return true} 
        else {return "Please select a department"}
    }
    
}])
.then((answer) => {
    let newRole = answer.role;
    let newSalary = answer.salary;
    let departmentChoice = answer.whichDepartment;
    let departmentId = [];
    let id;

    pool.query(`SELECT id FROM department WHERE name = '${departmentChoice}';`, (err, res) => {
        res.map(function({ id }) {departmentId.push(id)});
        id = departmentId.toString()
        pool.end;
    })
    
    setTimeout(getRole, 100);

    function getRole() {
    pool.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${newRole}", "${newSalary}", ${id})`) 
    .then( () => {
        console.log(`Added ${newRole} to the database`)
        pool.end;
    }); setTimeout(menuPrompt, 100);
    }
})
}

/* -------------------------------------------------------------------------- */
/*                               Add Department                               */
/* -------------------------------------------------------------------------- */


function addDepartment() {
inquirer
.prompt([{
    type: 'input',
    message: 'What is the name of the department?',
    name: 'department',
    validate: (value) => { 
        if(value){return true} 
        else {return "Please enter a department name"}
}}])
.then((answer) => {

    pool.query(`INSERT INTO department (name) VALUES ("${answer.department}")`, (err, res) => {
        if (err) throw err
        console.log(`Added ${answer.department} to the database`);
        setTimeout(menuPrompt, 100);
    })
}) 
}

