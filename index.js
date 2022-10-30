const inquirer = require('inquirer');
const cTable = require('console.table');
const { createPool } = require('mysql2');

// First function called runs the menu prompt
/* menuPrompt()  */

// creates a pool (runs mysql)
const pool = createPool({
    host: "localhost",
    user: "root",
    waitForConnections: true,
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
    pool.query(`SELECT * FROM employee_db.role.title;`, (err, res) => {
        return console.table(res)
    })
}


/* -------------------------------------------------------------------------- */
/*                                Add Employee                                */
/* -------------------------------------------------------------------------- */



pool.execute(`SELECT * FROM employee_db.role`, (err, res) => {

    const roles = res.map(
        function({ title }) {
            console.log(title);
        }
    )

    /*  example

       employeeRoles.push(res)
    console.log(employeeRoles);

     [
        { id: 1, title: 'Sales Lead', salary: '100000' },
        { id: 2, title: 'Salesperson', salary: '80000' },
        { id: 3, title: 'Lead Engineer', salary: '150000' },
        { id: 4, title: 'Software Engineer', salary: '120000' },
        { id: 5, title: 'Account Manager', salary: '160000' },
        { id: 6, title: 'Accountant', salary: '125000' },
        { id: 7, title: 'Legal Team Lead', salary: '250000' },
        { id: 8, title: 'Lawyer', salary: '190000' }
      ]
    ] */
    
}) 

function addEmployee() {
inquirer.prompt(
    [
        {
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

        }
    ]
)

}























let departments = [];

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
    let newDepartment = answer.department
    pool.execute (`INSERT INTO employee_db.department (id, name) VALUES (000, "${newDepartment}")`); 
    console.log(`added ${newDepartment} to the database`)
    pool.end
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