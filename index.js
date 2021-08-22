//Dependencies --------------------------------------------------------
require('dotenv').config();
//App creation
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Import controllers 
const employees = require('./controller/employees');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Port Listening
app.listen(port, () => console.log('Server Running on PORT: ' + port));

//End points ----------------------------------------------------------
//Welcome Page .................................
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

//Employees ....................................
//Returns the whole table
app.get('/employees/:id', (req, res) => { employees.getDataByPage(req, res, req.params.id) });
//Returns the employee according to the given id
app.get('/employees/emp_no/:id', (req, res) => { employees.getDataByID(req, res, req.params.id) });
//Adds a whole row into the table
app.post('/employees/addEmployee', (req, res) => { employees.postAddEmployee(req, res, req.body) });
//Updates a row according to the given id
app.put('/employees/updateBy_emp_no/:id', (req, res) => { employees.putUpdateEmployee(req, res, req.params.id, req.body) });
//Deletes a row according to the given id
app.delete('/employees/deleteBy_emp_no/:id', (req, res)=>{ employees.deleteEmployeeByID(req, res, req.params.id) });

//TODO
//Salaries .....................................

//TODO
//Titles .......................................

//TODO
//Departments .................................

//TODO ?
//Dept_Emp
//Dept_Emp_Latest_Date
//Dept_Mananger

