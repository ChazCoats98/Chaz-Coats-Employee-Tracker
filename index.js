var inquirer = require('inquirer');
var mysql = require('mysql2');
require("dotenv").config();

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3000,
    user: 'root',
})
var dbNav = [
    {name: "prompt",
    type: "list",
    message: "Hello, what would you like to look at today?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update employee role"]
}
]

function promptQuestions() {
    inquirer.prompt(dbNav).then(function(data) {
        switch (data.prompt) {
            case "view all departments": 
            function viewDepartments() {
                connection.query("SELECT * FROM departments", function(err, res) {
                    
                });
            }
            break;
            case "view all roles":

            break;
            case "view all employees":

            break;
            case "add a department":

            break;
            case "add a role":

            break;
            case "add an employee":
                
            break;
            case "update employee role":

            break; 
        }
    });
}