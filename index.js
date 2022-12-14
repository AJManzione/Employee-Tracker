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
/*                                    Quit                                    */
/* -------------------------------------------------------------------------- */

function quitMenu() {
    process.exit()
}






/* -------------------------------------------------------------------------- */
/*                                 Menu Prompt                                */
/* -------------------------------------------------------------------------- */

function menuPrompt() {

inquirer
.prompt ([{
    type: 'list',
    message: "What would you like to do?",
    name: 'welcome',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Roles', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    validate: (value) => { 
        if(value){return true} 
        else {return "Please make a selection"}
    }
}])
.then ((answer) => {
    
    if(!answer.welcome) {
        console.log("You did not make a selection");
    } else if (answer.welcome == "View All Employees") {
        viewAllEmployees();
    } else if (answer.welcome == "Add Employee") {
        addEmployee();
    } else if (answer.welcome == "Update Employee Roles") {
        updateEmployeeRole();
    } else if (answer.welcome == "View All Roles") {
        viewAllRoles();
    } else if (answer.welcome == "Add Role") {
        addRole();
    } else if (answer.welcome == "View All Departments") {
        viewAllDepartments();
    } else if (answer.welcome == "Add Department") {
        addDepartment();
    } else if (answer.welcome == "Quit") {
        quitMenu();
    }
})
}


/* -------------------------------------------------------------------------- */
/*                             View All Employees                             */
/* -------------------------------------------------------------------------- */

function viewAllEmployees() {
    pool.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(e.first_name, ' ' ,e.last_name) AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;`,(err, res) => {
      if (err) throw err;
      console.log('\n')
      console.log('- SHOWING ALL EMPLOYEES -')
      console.log('\n')
      console.table(res);
      console.log('\n')
    }); setTimeout(menuPrompt, 100); 
}

/* -------------------------------------------------------------------------- */
/*                            View All Departments                            */
/* -------------------------------------------------------------------------- */

function viewAllDepartments() {

    pool.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.log('- SHOWING ALL DEPARTMENTS -')
        console.log('\n')
        console.table(res);
        console.log('\n')
        menuPrompt();
    });
}
/* -------------------------------------------------------------------------- */
/*                               View All Roles                               */
/* -------------------------------------------------------------------------- */


function viewAllRoles() {
    pool.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM employee_db.role INNER JOIN department ON department_id = department.id;`, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.log('- SHOWING ALL ROLES -')
        console.log('\n')
        console.table(res);
        console.log('\n')
        menuPrompt();
    }); 
}

/* -------------------------------------------------------------------------- */
/*                            Update Employee Role                            */
/* -------------------------------------------------------------------------- */

function updateEmployeeRole() {
    let employeeNames = [];
    let allRoles = [];

    pool.query(`SELECT CONCAT_WS(" ", first_name, last_name) AS whole_name FROM employee_db.employee;`, (err, res) => {
        if (err) throw err;
        res.map(function({ whole_name }) {employeeNames.push(whole_name)}); 
    });

    pool.query(`SELECT role.title FROM employee_db.role;`, (err, res) => {
        if (err) throw err;
        res.map(function({ title }) {allRoles.push(title)});
    });


setTimeout(inquireUpdateER, 100);

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
        else {return "Please choose an employee"}
    }
}])
.then((answer) => {
    selectedEmployee.push(answer.updateEmployee);
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
        else {return "Please choose a role"}
    }

}])
.then((answer) => {
    let newRoleID = [];
    let id;

    let name = selectedEmployee.toString()
    let firstName = name.split(" ")[0]
    let lastName = name.split(" ")[1]
    

    pool.execute(`SELECT role.id FROM employee_db.role WHERE title = "${answer.newRole}";`, (err, res) => {
        res.map(function({ id }) {newRoleID.push(id)});
        id = newRoleID.toString()
        });

        setTimeout(changeRole, 100);
        
 
    function changeRole() {   
        pool.query(`UPDATE employee_db.employee SET role_id = ${id} WHERE first_name = "${firstName}" AND last_name = "${lastName}";`, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.log(`Successfully changed ${firstName} ${lastName} to ${answer.newRole}`);
            console.log('\n');
            menuPrompt();
        });
        }
    })
}}

/* -------------------------------------------------------------------------- */
/*                                Add Employee                                */
/* -------------------------------------------------------------------------- */

employeeRoles = []

function addEmployee() {
    
    pool.execute(`SELECT * FROM employee_db.role;`, (err, res) => {
        if (err) throw err;
        res.map(function({ title }) {employeeRoles.push(title)}); 
    })

var managersArr = ["No Manager"];

function selectManager() {
  pool.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }
  }); return managersArr;

}

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
},
{
    type: 'list',
    message: "Who is the employees manager?",
    name: 'manager',
    choices: selectManager(),
    validate: (value) => { 
        if(value){return true} 
        else {return "Please make a selection"}
    }
}])
.then((answer) => {
    let managerId;
    let roleId = [];
    let id;

    if (answer.manager == "No Manager") {
        managerId = "null"
    } else {  
        managerId = selectManager().indexOf(answer.manager)}

    pool.query(`SELECT id FROM employee_db.role WHERE title = '${answer.employeeRole}';`, (err, res) => {
        res.map(function({ id }) {roleId.push(id)});
        id = roleId.toString()
        getEmployee();
    })

    function getEmployee() {
    pool.query(`INSERT INTO employee_db.employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}", "${answer.lastName}", ${id}, ${managerId})`, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
        console.log('\n');
        menuPrompt();
    })
    }   
})
}

/* -------------------------------------------------------------------------- */
/*                                  Add Role                                  */
/* -------------------------------------------------------------------------- */

let departments = [];

function addRole() {

    pool.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err
        res.map(function({ name }) {departments.push(name)});  
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
    let departmentId = [];
    let id;

    pool.query(`SELECT id FROM department WHERE name = '${answer.whichDepartment}';`, (err, res) => {
        if (err) throw err;
        res.map(function({ id }) {departmentId.push(id)});
        id = departmentId.toString()
    })
    
    setTimeout(getRole, 100);

    function getRole() {
        pool.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.role}", "${answer.salary}", ${id})`, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.log(`Added ${answer.role} to the database`);
            console.log('\n');
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
        }
}])
.then((answer) => {

    pool.query(`INSERT INTO department (name) VALUES ("${answer.department}")`, (err, res) => {
        if (err) throw err
        console.log('\n');
        console.log(`Added ${answer.department} to the database`);
        console.log('\n');
        setTimeout(menuPrompt, 100);
    })
}) 
}

