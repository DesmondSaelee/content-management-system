let inquirer = require('inquirer')
let mysql2 = require('mysql2')

const db = mysql2.createConnection(
    {
        host: 'localhost',

        user: 'root',

        password: 'Saelee12!',
        database: 'departmentRoles_db'
    },
    console.log(`Connected to the movies_db database.`)
);

let initialQuestions = [
    {
        type: 'list',
        name: 'choice',
        message: 'select from the options below',
        choices: ['View all departments?','View all roles?','View all employees?', 'Add a department?', 'Add an employee?', 'Update and employee role?']
    },
    
];

function init() {
    inquirer.prompt(initialQuestions).then(answers => {
        console.log(answers)
        let user_choice = answers.choice
        
        if (user_choice === 'View all departments?') {
            viewAllDepartments()
        } else if (user_choice === "viewRoles") {
            viewAllRoles()
        } else if (user_choice === "viewEmployees") {
            viewAllEmployees()
        } else if (user_choice === "addDepartments") {
            addDepartment()
        } else if (user_choice === "addEmployee") {
            addEmployee()
        } else if (user_choice === "updateEmployee") {
            updateEmployee()
        }
    })
}

function viewAllDepartments() {
    db.query(`select * from department`, (err, data) => {
        if (err) console.log(err)

        console.table(data)
        init()
    })
};

init();

