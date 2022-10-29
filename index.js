const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const consoleTable = require('console.table');

inquirer.prompt (
    [
        {
            type: 'input',
            message: 'How are you?',
            name: 'ok'
        }
    ]
)