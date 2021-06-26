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
          viewAllDepartments();
          break;

        case 'View All Employee Roles':
          viewAllRoles();
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

const viewAllDepartments = () => {
  connection.query('SELECT name AS Departments FROM department', (err, res) => {
    if (err) throw err
    console.table(res);
    runSearch();
  })
}


//========== VIEW ALL EMPLOYEES BY ROLE ==========//

const viewAllRoles = () => {
  connection.query('SELECT title, salary FROM employee_role', (err, res) => {
    if (err) throw err
    console.table(res);
    runSearch();
  })
}


//========== ADD EMPLOYEE ==========//

function addEmployee() {
  connection.query("SELECT * FROM employee_role", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: `employeeAdd`,
          type: `input`,
          message: `Enter the first name of the employee you would like to add.`,
        },
        {
          name: `last_name`,
          type: `input`,
          message: `Enter the last name of the employee you would like to add.`,
        },
        {
          name: `role_id`,
          type: `list`,
          message: `Select the role of this employee.`,
          choices: results.map((item) => item.title),
        },
      ])
      .then((answer) => {
        const roleChosen = results.find(
          (item) => item.title === answer.role_id
        );
        const employeeFirstName = answer.employeeAdd;
        const employeeLastName = answer.last_name;
        connection.query("SELECT * FROM employee", function (err, results) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: `manager_id`,
                type: `list`,
                message: `Select the Manager for this employee.`,
                choices: results.map((item) => item.first_name),
              },
            ])
            .then((answer) => {
              const managerChosen = results.find(
                (item) => item.first_name === answer.manager_id
              );
              connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: employeeFirstName,
                  last_name: employeeLastName,
                  role_id: roleChosen.id,
                  manager_id: managerChosen.id,
                },
                function (err) {
                  if (err) throw err;
                  console.log(
                    "Added " +
                      employeeFirstName +
                      " " +
                      employeeLastName +
                      " to the team!"
                  );
                  runSearch();
                }
              );
            });
        });
      });
  });
}

// //========== REMOVE EMPLOYEE ==========//

function removeEmployee() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "rawlist",
        name: "removeEmp",
        message: "Select the employee who will be removed",
        choices: res.map(emp => emp.id && emp.first_name)
      }
    ]).then(function (answer) {
      const selectedEmp = res.find(emp => emp.id && emp.first_name === answer.removeEmp);
      connection.query("DELETE FROM employee WHERE ?",
        [{
          id: selectedEmp.id
        }],
        function (err, res) {
          if (err) throw err;
          console.log("The employee has been removed.\n");
          runSearch();
        }
      );
    });
  })
};

// //========== UPDATE EMPLOYEE ROLE ==========//
const updateEmployeeRole = () => {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: `employeeUpdate`,
          type: `list`,
          message: "Choose the employee whose role you would like to update.",
          choices: results.map((employee) => employee.first_name),
        },
      ])
      .then((answer) => {
        const updateEmployee = answer.employeeUpdate;
        connection.query(
          "SELECT * FROM employee_role",
          function (err, results) {
            if (err) throw err;
            inquirer
              .prompt([
                {
                  name: "role_id",
                  type: "list",
                  message: "Select the new role of the employee.",
                  choices: results.map((employee_role) => employee_role.title),
                },
              ])
              .then((answer) => {
                const roleChosen = results.find(
                  (employee_role) => employee_role.title === answer.role_id
                );
                connection.query(
                  "UPDATE employee SET ? WHERE first_name = " +
                    "'" +
                    updateEmployee +
                    "'",
                  {
                    role_id: "" + roleChosen.id + "",
                  },
                  function (err) {
                    if (err) throw err;
                    console.log(
                      "Successfully updated " +
                        updateEmployee +
                        "'s role to " +
                        answer.role_id +
                        "!"
                    );
                    runSearch();
                  }
                );
              });
          }
        );
      });
  });
};



//========== UPDATE EMPLOYEE MANAGER ==========//
const updateEmployeeManager = () => {
    
}

runSearch();


// //============= ADD EMPLOYEE ROLE ==========================//
// function addRole() { 
//   connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
//     inquirer.prompt([
//         {
//           name: "Title",
//           type: "input",
//           message: "What is the title of the role?"
//         },
//         {
//           name: "Salary",
//           type: "input",
//           message: "What is the salary of the role?"

//         } 
//     ]).then(function(res) {
//         connection.query(
//             "INSERT INTO role SET ?",
//             {
//               title: res.Title,
//               salary: res.Salary,
//             },
//             function(err) {
//                 if (err) throw err
//                 console.table(res);
//                 startPrompt();
//             }
//         )

//     });
//   });
//   }

// //============= ADD DEPARTMENT ==========================//
// function addDepartment() { 

//     inquirer.prompt([
//         {
//           name: "name",
//           type: "input",
//           message: "What department would you like to add?"
//         }
//     ]).then(function(res) {
//         var query = connection.query(
//             "INSERT INTO department SET ? ",
//             {
//               name: res.name
            
//             },
//             function(err) {
//                 if (err) throw err
//                 console.table(res);
//                 startPrompt();
//             }
//         )
//     })
//   }