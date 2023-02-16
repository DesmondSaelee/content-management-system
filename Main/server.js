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
        choices: ['View all departments?','View all roles?','View all employees?', 'Add a department?', 'Add an employee?', 'Add a Role?', 'Update and employee role?']
    },
    
];

function init() {
    inquirer.prompt(initialQuestions).then(answers => {
        console.log(answers)
        let user_choice = answers.choice
        
        if (user_choice === 'View all departments?') {
            viewAllDepartments()
        } else if (user_choice === "View all roles?") {
            viewAllRoles()
        } else if (user_choice === "View all employees?") {
            viewAllEmployees()
        } else if (user_choice === "Add a department?") {
            addDepartment()
        } else if (user_choice === "Add an employee?") {
            addEmployee()
        } else if (user_choice === "Update and employee role?") {
            updateEmployee()
        } else if (user_choice === "Add a Role?") {
            addRole()
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

function viewAllRoles() {
    db.query(`select * from roles`, (err, data) => {
        if (err) console.log(err)

        console.table(data)
        init()
    })
};

function viewAllEmployees() {
    db.query(`select * from employee`, (err, data) => {
        if (err) console.log(err)

        console.table(data)
        init()
    })
};

function addDepartment() {
    inquirer.prompt([{
        
            
            name: 'department_name',
            message: 'What is the name of the department?'
          
    }]) 
    // need to figure out correct syntax to insert department name.
    .then (res => {
        console.log(res.department_name)
        db.query("INSERT INTO department (department_name) VALUES ?", [res.department_name], (err, result) => {
            if (err){
                throw err
            } 
            console.log(result)
        } )
    })
    
};

function addRole() {
    inquirer.prompt([
        
          {
            name: 'role_name',
            message: 'What is the name of the role?'
          },
          {
            name: 'role_salary',
            message: 'What is the salary of the role?'

          },
          {
            name: 'role_department',
            message: 'What is the department of the role?'

          },
    ]) 
};

function addEmployee() {
    inquirer.prompt([
        
          {
            name: 'first_name',
            message: 'What is the employees first name?'
          },
          {
            name: 'last_name',
            message: 'What is the employees last name?'
          },
          {
            name: 'employee_role',
            message: 'What is the role of the employee?'

          },
          {
            name: 'manager',
            message: 'Who is the manager of the employee?'

          },
    ]) 
};

function updateEmployee() {
    inquirer.prompt([
        
          {
            type: 'list',
            name: 'employee_choices',
            message: 'Which employee would you like to update?',
            choices: ['John doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen']
          },
          {
            type: 'list',
            name: 'new_role',
            message: 'What is the employees new role?',
            choices:['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
          }
    ]) 
};



init();

