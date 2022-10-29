const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const consoleTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');

menuPrompt()










function addDepartment() {
inquirer.prompt(
    [
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'department',
            validate: (value) => { 
                if(value){return true} 
                else {return "Please select a department name"}
            }

        }
    ]
)
.then((answer) => {
    let userAnswer = answer.department;

    if(!userAnswer) {
        return console.log("You did not provide a department name")
    } else { 
        console.log(`added ${userAnswer} to the database`)
    }
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
        return console.log("You did not make a selection");
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