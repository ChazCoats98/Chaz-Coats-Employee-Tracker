var inquirer = require('inquirer');
var mysql = require('mysql2');
var express = require('express');
var PORT = process.env.PORT || 3001;
var app = express();
//used to secure password
require("dotenv").config();

//middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json);

//creates connection to database using mysql2
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "employee_database"
},
    console.log("connected to the employee database")
);

//prompt questions. As you'll see, some questions I stored in objects and some I put directly into the inquirer functions. 
//If I had more time I'd clean this up.
var dbNav = [
    {
        name: "prompt",
        type: "list",
        message: "Hello, what would you like to look at today?",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update employee role", "end"]
    }
]
var departmentPrompt = [
    {
        name: "newDepartment",
        type: "input",
        message: "Type the name of the department"
    }
];
var roleUpdate = [
    {
        name: "employeeName",
        type: "list",
        message: "What is the name of the employee whose role you would like to change",
        choices: []
    },
    {
        name: "roleName",
        type: "list",
        message: "What is the new role of this employee",
        choices: []
    }
]

//prompts the initial set of questions then uses a break case to read answers and execute their related functions
function promptQuestions() {
    inquirer.prompt(dbNav).then(function (data) {
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

//function to display departments table
function viewDepartments() {
    console.log("departments function")
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log("displaying departments");
        console.table(res);
        promptQuestions();
    });
}
//function to combine the role and department tables and display the result
function viewRoles() {
    db.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id;", function (err, res) {
        console.table(res);
        promptQuestions();
    });
}
//function to combine all 3 tables and display results
function viewEmployees() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, department.name AS department, manager.first_name AS manager_firstName, manager.last_name AS manager_lastName FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;", function (err, res) {
        console.table(res);
        promptQuestions();
    })
}
//creates new department and pushes it to department table
function newDepartment() {
    inquirer.prompt(departmentPrompt).then(function (data) {
        db.query("INSERT INTO department (name) VALUE (?)", [data.newDepartment], function (err, res) {
            viewDepartments();
        });
    });
}
//creates new role and pushes it to role table. For some reason I cant get it to add new roles
function newRole() {
    const departmentList = () => db.promise().query("SELECT * FROM department").then(function (data){
        var departments = data[0].map(data => data.name);
        return departments
    });
    inquirer.prompt([
        {
            name: "newRole",
            type: "input",
            message: "Type the name of the role"
        },
        {
            name: "roleSalary",
            type: "input",
            message: "What is the salary of the role"
        },
        {
            name: "department",
            type: "list",
            message: "What is the department this role belongs to",
            choices: departmentList
        }
    ]).then(function response (data) {
        db.promise().query("SELECT id FROM department WHERE name = ?", data.department).then(function (data) {
            var deptId = data[0].map(data => data.id);
            return deptId
        });
        db.query(`INSERT INTO role (title, salary, department_id) VALUE (?, ?)`, [data.newRole, data.roleSalary, response], function (err, res) {
            viewRoles();
        });
    });
    }
    //function to add new employee. Cant get it to prompt the manager name or add to employee table.
function newEmployee() {
    const roleList = () => db.promise().query("SELECT * FROM role").then(function (data){
        var roles = data[0].map(data => data.title);
        return roles
    });
    const managerList = () => db.promise().query("SELECT first_name, last_name, CONCAT(first_name + ' ' + last_name) AS manager FROM employee").then(function (data){
        var manager = data[0].map(data => data);
        return manager
    });
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee"
        },
        {
            name: "roleId",
            type: "list",
            message: "What is the role for this employee",
            choices: roleList
        },
        {
            name: "managerName",
            type: "list",
            message: "Who is the manager for this employee",
            choices: managerList
        }
    ]).then(function (data) {
        db.query(`INSERT INTO employee (title, salary) VALUE (?, ?, ?)`, [data.firstName, data.lastName, data.roleName, data.managerId], function (err, res) {
            viewEmployees();
        });
    });
}
//ran out of time for this one
function updateRole() {
    inquirer.prompt(roleUpdate).then(function (data) { });
}
//shuts server down when done
function end() {
    process.exit();
};
//calls initial prompt questions
promptQuestions();
//displays express server status. I don't think this is necessary but I added it anyways
app.use(function (req, res) {
    res.status(404).end();
})

app.listen(PORT);

