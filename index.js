const inquirer = require('inquirer');
const cTable = require('console.table');
const { createPool } = require('mysql2');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "123123321",
    connectionLimit: 30
})

pool.query(`SELECT * FROM employee_db.department;`, (err, res) => {
    return console.table(res)
})

/* menuPrompt()

let departments = ['CEO'];


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
} */