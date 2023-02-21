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
    db.query(`SELECT  employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", roles.title AS "Title", department.department_name  AS "Department", roles.salary, CONCAT(mgr.first_name, " ", mgr.last_name) AS "Manager" 
    FROM employee
    
    LEFT JOIN roles ON roles.id = employee.role_id
    LEFT JOIN department ON department.id = roles.department_id 
    LEFT JOIN employee mgr ON employee.manager_id = mgr.id ;
  `, (err, data) => {
        if (err) console.log(err)

        console.table(data)
        init()
    })
};

function addDepartment() {
    inquirer.prompt([{
        
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department?'
          
    }]) 
    
    .then (res => {
        let name = res.department_name
        db.query("INSERT INTO department (department_name) VALUES (?)", name, (err, result) => {
            if (err){
                throw err
            } 
            viewAllDepartments()
            init()
        } )
    })
    
};

function addRole() {
    inquirer.prompt([
        
          {
            type: 'input',
            name: 'role_name',
            message: 'What is the role title?'
          },
          {
            type: 'input',
            name: 'role_salary',
            message: 'What is the salary of the role?'

          },
          {
            type: 'input',
            name: 'role_department',
            message: 'What is the department id of the role?'

          },
    ]) 

    .then (res => {
        let name = res.role_name
        let salary = res.role_salary
        let department = res.role_department
        db.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [name, salary, department], (err, result) => {
            if (err){
                throw err
            } 
            viewAllRoles()
            init()
        } )
    })
};

function addEmployee() {
    inquirer.prompt([
        
          {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
          },
          {
            type: 'input',
            name: 'employee_role',
            message: 'What is the role id of the employee?'

          },
          {
            type: 'input',
            name: 'manager',
            message: 'What is the manager id of the employee?'

          },
    ]) 

    .then (res => {
        let firstName = res.first_name
        let lastName = res.last_name
        let role = res.employee_role
        let mgr = res.manager
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [firstName, lastName, role, mgr], (err, result) => {
            if (err){
                throw err
            } 
            viewAllEmployees()
            init()
        } )
    })
};

function updateEmployee() {
    db.query('select * from employee;', (err,data) => {
        if (err) console.log(err)
        let employeeList = data.map(employee => {
            return{ 
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        })
        console.log(employeeList)
        db.query('select * from roles;', (err,data) =>{
            if (err) console.log(err)
            let roleList = data.map(roles => {
                return{
                    title:`${roles.title}`,
                    value: roles.id
                }
            })
            
            console.log(roleList)

            inquirer.prompt([
        
                {
                  type: 'list',
                  name: 'employee_choices',
                  message: 'Which employee would you like to update?',
                  choices: employeeList
                },
                {
                  type: 'list',
                  name: 'new_role',
                  message: 'What is the employees new role?',
                  choices: roleList
                }
          ]) 
      
          .then (res => {
              let employee = res.employee_choices
              let newRole = res.new_role
              db.query(`UPDATE employee SET role_id=${newRole} WHERE id=${employee};`, (err, result) => {
                  if (err){
                      throw err
                  } 
                  viewAllEmployees()
                  init()
              } )
          })

        })


    })
    
};





init();

