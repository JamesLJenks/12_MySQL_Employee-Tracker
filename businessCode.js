const connection = require('./config/connection');
const inquirer = require('inquirer');

//========== APP RUN PROMPT ==========//
const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees By Department',
        'View All Departments',
        'View All Employee Roles',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          viewAllEmployees();
          break;
        
        case 'View All Employees By Department':
          viewEmployeesByDepartment();
          break;

        case 'View All Departments':
          viewDepartment();
          break;

        case 'View All Employee Roles':
          viewRoles();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Remove Employee':
          removeEmployee();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        case 'Update Employee Manager':
          updateEmployeeManager();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};


//========== VIEW ALL EMPLOYEES ==========//
const viewAllEmployees = () => {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name AS Department, employee_role.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN employee_role on employee_role.id = employee.role_id INNER JOIN department on department.id = employee_role.department_id left join employee e on employee.manager_id = e.id;", (err, res) => {
    if (err) throw err
    console.table(res);
    runSearch();
  })
}


//========== VIEW ALL EMPLOYEES BY DEPARTMENT ==========//
const viewEmployeesByDepartment = () => {
  connection.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN employee_role ON employee.role_id = employee_role.id JOIN department ON employee_role.department_id = department.id ORDER BY employee.id;', (err, res) => {
    if (err) throw err
    console.table(res);
    runSearch();
  })
}


//========== VIEW ALL DEPARTMENTS ==========//
const viewDepartment = () => {
  connection.query('SELECT name AS Departments FROM department', (err, res) => {
    if (err) throw err
    console.table(res);
    runSearch();
  })
}


//========== VIEW ALL EMPLOYEES BY ROLE ==========//
const viewRoles = () => {
  connection.query('SELECT title, salary FROM employee_role', (err, res) => {
    if (err) throw err
    console.table(res);
    runSearch();
  })
}


//========== ADD EMPLOYEE ==========//
const addEmployee = () => {
  connection.query('SELECT * FROM employee_role', function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "roleId",
        type: "rawlist",
        choices: res.map(employee_role => employee_role.title),
        message: "Select a role for the employee."
      }
      // {
      //   name: "manager",
      //   type: "rawlist",
      //   choices: res.map(employee => employee.lastName),
      //   message: "What is the name of the employee's manager?"
      // }
    ]).then(function (answers) {
      const selectedRole = res.find(employee_role => employee_role.title === answers.roleId);
      // const selectedManager = res.find(employee => employee.last_name === answers.managerId);
      connection.query('INSERT INTO employee SET ?',
        {
          first_name: answers.firstName, // column: inquirer response
          last_name: answers.lastName,
          role_id: selectedRole.id,
          // manager_id: selectedManager,
        }, function (err, res) {
          if (err) throw err;
          console.log("Added new employee named " + answers.firstName + " " + answers.lastName + "\n");
          runSearch();
        })
    })
  })
}


//========== REMOVE EMPLOYEE ==========//
// const removeEmployee = () => {
//   connection.query('DELETE FROM employee WHERE ?',
//     {

//     },
//     (err, res) => {
//       if (err) throw err;
//       console.log("Employee has been removed \n");
//       runSearch();
//     }
//   )
// }


//========== UPDATE EMPLOYEE ROLE ==========//
const updateEmployeeRole = () => {
  connection.query('SELECT * FROM employee', function (err, results){
    if (err) throw err;
    inquirer
    .prompt([{
        name: `employeeUpdate`,
        type: `list`,
        message: "Choose the employee whose role you would like to update.",
        choices: results.map(employee => employee.first_name)
        },
    ])
    .then((answer) => {
        const updateEmployee = (answer.employeeUpdate)
        connection.query('SELECT * FROM employee_role', function (err, results){
            if (err) throw err;
            inquirer
            .prompt([
        {
        name: 'role_id',
        type: 'list',
        message: "Select the new role of the employee.",
        choices: results.map(employee_role => employee_role.title)
        },
    ])
        .then((answer) => {
            const roleChosen = results.find(employee_role => employee_role.title === answer.role_id)
            connection.query(
              "UPDATE employee SET ? WHERE first_name = " + "'" + updateEmployee + "'", {
                role_id: "" + roleChosen.id + "",
              },
              function (err) {
                if (err) throw err;
                console.log("Successfully updated " + updateEmployee + "'s role to " + answer.role_id + "!");
                runSearch();
              }
            )
        })
      })
    })
  })
}

//========== UPDATE EMPLOYEE MANAGER ==========//
const updateEmployeeManager = () => {
    
}

runSearch();