const connection = require('./config/connection');
const inquirer = require('inquirer');

// MAIN MENU
const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
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


// VIEW ALL EMPLOYEES
const viewAllEmployees = () => { // Do this for all the views and change the table name
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err
    console.table(res);
    runSearch();
  })
}

// VIEW ALL EMPLOYEES BY DEPARTMENT
const viewDepartment = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err
    console.table(res);
    runSearch();
  })
}

// VIEW ALL EMPLOYEES BY MANAGER
const viewRoles = () => {
  connection.query("SELECT * FROM employee_role", (err, res) => {
    if (err) throw err
    console.table(res);
    runSearch();
  })
}

// ADD EMPLOYEE
const addEmployee = () => {
  connection.query("SELECT * FROM employee_role", function (err, res) {
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
        choices: res.map(role => role.title),
        message: "Select a role for the employee."
      }
    ]).then(function (answers) {
      const selectedRole = res.find(role => role.title === answers.roleId);
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answers.firstName, // column: inquirer response
          last_name: answers.lastName,
          role_id: selectedRole.id
        }, function (err, res) {
          if (err) throw err;
          console.log("Added new employee named " + answers.firstName + " " + answers.lastName + "\n");
          runSearch();
        })
    })
  })
}

// REMOVE EMPLOYEE
const removeEmployee = () => {
    // "DELETE FROM employee WHERE ?",
    // {}
}

// UPDATE EMPLOYEE ROLE
const updateEmployeeRole = () => {
  connection.query("SELECT * FROM employee", function (err, results){
    if (err) throw err;
    inquirer
    .prompt([{
        name: `employeeUpdate`,
        type: `list`,
        message: `Choose the employee whose role you would like to update.`,
        choices: results.map(employee => employee.first_name)
        },
    ])
    .then((answer) => {
        const updateEmployee = (answer.employeeUpdate)
        connection.query("SELECT * FROM employee_role", function (err, results){
            if (err) throw err;
            inquirer
            .prompt([
        {
        name: `role_id`,
        type: `list`,
        message: `Select the new role of the employee.`,
        choices: results.map(role => role.title)
        },
    ])
        .then((answer) => {
            const roleChosen = results.find(role => role.title===answer.role_id)
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

// UPDATE EMPLOYEE MANAGER
const updateEmployeeManager = () => {
    
}

runSearch();