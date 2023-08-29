var inquirer = require('inquirer');
var mysql = require('mysql2');
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MontegoBlueE92$",
    database: "employee_database"
},
console.log("connected to the employee database")
);
connection.connect((err) => {
    promptQuestions();
})
var dbNav = [
    {name: "prompt",
    type: "list",
    message: "Hello, what would you like to look at today?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update employee role"]
}
]
var departmentPrompt = [
    {name: "newDepartment",
    type: "input",
    message: "Type the name of the department"
}
];
var rolePrompt = [
    {name: "newRole",
    type: "input",
    message: "Type the name of the role"
},
    {name: "roleSalary",
    type: "input",
    message: "What is the salary of the role"
}
];
var employeePrompt = [
    {name: "firstName",
    type: "input",
    message: "What is the first name of the employee"
},
    {name: "lastName",
    type: "input",
    message: "What is the last name of the employee"
},
    {name: "roleName",
    type: "list",
    message: "What is the role of this employee",
    choices: []
},
    {name: "managerName",
    type: "list",
    message: "Who is the manager of this employee",
    choices: []
}
];
var rolePrompt = [
    {name: "employeeName",
    type: "list",
    message: "What is the name of the employee whose role you would like to change",
    choices: []
},
    {name: "roleName",
    type: "list",
    message: "What is the new role of this employee",
    choices: []
}
]

function promptQuestions() {
    inquirer.prompt(dbNav).then(function(data) {
        switch (data.prompt) {
            case "view all departments": 
            viewDepartments();
            break;
            case "view all roles":
                viewRoles();
            break;
            case "view all employees":
            viewEmployees();
            break;
            case "add a department":
            newDepartment();
            break;
            case "add a role":
            newRole();
            break;
            case "add an employee":
            newEmployee();
            break;
            case "update employee role":
            updateRole();
            break; 
        }
    });
}

function viewDepartments() {
    connection.query("SELECT * FROM departments", function(err, res) {
        console.log(res);
        promptQuestions();
    });
}
function viewRoles() {
    connection.query("SELECT * FROM roles", function(err, res) {
        console.log(res);
        promptQuestions();
    });
}
function viewEmployees() {
    connection.query("SELECT * FROM employees", function(err, res) {
        console.log(res);
        promptQuestions();
    })
}
function newDepartment() {
    inquirer.prompt(departmentPrompt).then(function(data) {
        connection.query("INSERT INTO department (name) VALUES (?)", function(err, res) {

        });
    });
}
function newRole() {
    inquirer.prompt(rolePrompt).then(function(data) {});
}
function newEmployee() {
    inquirer.prompt(employeePrompt).then(function(data) {});
}
function updateRole() {
    inquirer.prompt(rolePrompt).then(function(data) {});
}