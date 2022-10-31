const inquirer = require('inquirer');
const cTable = require('console.table');
const { createPool } = require('mysql2');

// First function called runs the menu prompt
menuPrompt() 

// creates a pool (runs mysql)
const pool = createPool({
    host: "localhost",
    user: "root",
    waitForConnections: true,
    password: "123123321",
    connectionLimit: 30
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

async function viewAllEmployees() {
    pool.promise().query(`SELECT employee.id, first_name, last_name, title, department, salary FROM employee_db.employee INNER JOIN employee_db.department ON employee.id = department.id INNER JOIN employee_db.role ON employee.id = role.id`) 
    .then( ([rows, fields]) => {
        console.table(rows)
    }) 
    
    
}


/* -------------------------------------------------------------------------- */
/*                            View All Departments                            */
/* -------------------------------------------------------------------------- */

function viewAllDepartments() {

    pool.promise().query(`SELECT * FROM employee_db.department;`) 
    .then( ([rows, fields]) => {
        console.table(rows)
    }); setTimeout(menuPrompt, 100);
    

}
/* -------------------------------------------------------------------------- */
/*                               View All Roles                               */
/* -------------------------------------------------------------------------- */

function viewAllRoles() {
    pool.query(`SELECT role.id, title, department, salary FROM employee_db.role INNER JOIN employee_db.department ON department_id = department.id`, (err, res) => {
        console.table(res)
    }); setTimeout(menuPrompt, 100);
}

/* -------------------------------------------------------------------------- */
/*                                Add Employee                                */
/* -------------------------------------------------------------------------- */


employeeRoles = []

function addEmployee() {
    
    pool.execute(`SELECT * FROM employee_db.role`, (err, res) => {
        res.map(function({ title }) {employeeRoles.push(title)}); 
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

    pool.promise().query(`INSERT INTO employee_db.employee (id, first_name, last_name, role_id, manager_id) VALUES (000, "${firstName}", "${lastName}", 008, 100)`) 
    .then( () => {
        console.log(`Added ${firstName} ${lastName} to the database`)
    }); setTimeout(menuPrompt, 100);
})

}

/* -------------------------------------------------------------------------- */
/*                                  Add Role                                  */
/* -------------------------------------------------------------------------- */

let departments = [];

function addRole() {

    pool.execute(`SELECT * FROM employee_db.department`, (err, res) => {
        res.map(function({ title }) {departments.push(title)}); 
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
    choices: departments
    
}])
.then((answer) => {
    let newRole = answer.role;
    let newSalary = answer.salary;

    pool.promise().query(`INSERT INTO employee_db.role (id, title, salary) VALUES (000, "${newRole}", "${newSalary}")`) 
    .then( () => {
        console.log(`Added ${newRole} to the database`)
    }); setTimeout(menuPrompt, 100);

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
    let newDepartment = answer.department;

    pool.promise().query(`INSERT INTO employee_db.department (id, title) VALUES (000, "${newDepartment}")`) 
    .then(console.log(`Added ${newDepartment} to the database`)); setTimeout(menuPrompt, 500);
}) 
}

