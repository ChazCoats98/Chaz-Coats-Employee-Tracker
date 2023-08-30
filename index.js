var inquirer = require('inquirer');
var mysql = require('mysql2');
var express = require('express');
var PORT = process.env.PORT || 3001;
var app = express();
require("dotenv").config();

app.use(express.urlencoded({extended: false}));
app.use(express.json);

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MontegoBlueE92$",
    database: "employee_database"
},
console.log("connected to the employee database")
);

var dbNav = [
    {name: "prompt",
    type: "list",
    message: "Hello, what would you like to look at today?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update employee role", "end"]
}
]
var departmentPrompt = [
    {name: "newDepartment",
    type: "input",
    message: "Type the name of the department"
}
];
var roleAdd = [
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
var roleUpdate = [
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
            console.log("view all departments");
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
            case "end":
            end();
            break;
        }
    });
}


function viewDepartments() {
    console.log("departments function")
    db.query("SELECT * FROM department", function(err, result) {
        if (err) throw err;
        console.log("displaying departments");
        console.table(result);
        promptQuestions();
    });
}
function viewRoles() {
    db.query("SELECT * FROM role", function(err, res) {
        console.table(res);
        promptQuestions();
    });
}
function viewEmployees() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, department.name AS department, manager.first_name AS manager_firstName, manager.last_name AS manager_lastName FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;", function(err, res) {
        console.table(res);
        promptQuestions();
    })
}
function newDepartment() {
    inquirer.prompt(departmentPrompt).then(function(data) {
        db.query("INSERT INTO department (name) VALUES (?)", function(err, res) {

        });
    });
}
function newRole() {
    inquirer.prompt(roleAdd).then(function(data) {});
}
function newEmployee() {
    inquirer.prompt(employeePrompt).then(function(data) {});
}
function updateRole() {
    inquirer.prompt(roleUpdate).then(function(data) {});
}
function end() {
    process.exit();
};

promptQuestions();

app.use(function(req, res) {
    res.status(404).end();
})

app.listen(PORT);

