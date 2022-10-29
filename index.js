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
    connectionLimit: 30
})


/* -------------------------------------------------------------------------- */
/*                            View All Departments                            */
/* -------------------------------------------------------------------------- */

function viewAllDepartments() {
    pool.query(`SELECT * FROM employee_db.department;`, (err, res) => {
        return console.table(res)
    })
}

/* -------------------------------------------------------------------------- */
/*                               View All Roles                               */
/* -------------------------------------------------------------------------- */

function viewAllRoles() {
    pool.query(`SELECT * FROM employee_db.role;`, (err, res) => {
        return console.table(res)
    })
}

let departments = ['CEO'];

/* -------------------------------------------------------------------------- */
/*                                  Add Role                                  */
/* -------------------------------------------------------------------------- */

function addRole() {
    inquirer.prompt(
        [
            {
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
    
            }
        ]
    )
    .then(() => {
            menuPrompt()
    })
    
    }

/* -------------------------------------------------------------------------- */
/*                               Add Department                               */
/* -------------------------------------------------------------------------- */


function addDepartment() {
inquirer.prompt(
    [
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'department',
            validate: (value) => { 
                if(value){return true} 
                else {return "Please enter a department name"}
            }

        }
    ]
)
.then((answer) => {
    departments.push(answer.department)
    console.log(`added ${userAnswer} to the database`)
    menuPrompt()
         
})
}

/* -------------------------------------------------------------------------- */
/*                                 Menu Prompt                                */
/* -------------------------------------------------------------------------- */

function menuPrompt() {
inquirer.prompt (
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