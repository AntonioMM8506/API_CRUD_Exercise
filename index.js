//Dependencies --------------------------------------------------------
require('dotenv').config();
//App creation
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Import controllers 
const employees = require('./controller/employees');
const departments = require('./controller/departments');
const salaries = require('./controller/salaries');
const titles = require('./controller/titles');
const dept_emp = require('./controller/dept_emp');
const dept_manager = require('./controller/dept_manager');

//body-parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Port Listening
app.listen(port, () => console.log('Server Running on PORT: ' + port));


//End points ----------------------------------------------------------
//Welcome Page .................................
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

//Employees ....................................
app.get('/employees/:id', (req, res) => { employees.getDataByPage(req, res, req.params.id) }); //Returns the whole table, first 100 records
app.get('/employees/emp_no/:id', (req, res) => { employees.getDataByID(req, res, req.params.id) }); //Returns the employee according to the given id
app.post('/employees/addEmployee', (req, res) => { employees.postAddEmployee(req, res, req.body) }); //Adds a whole row into the table
app.put('/employees/updateBy_emp_no/:id', (req, res) => { employees.putUpdateEmployee(req, res, req.params.id, req.body) }); //Updates a row according to the given id
app.delete('/employees/deleteBy_emp_no/:id', (req, res)=>{ employees.deleteEmployeeByID(req, res, req.params.id) }); //Deletes a row according to the given id


//The same strcuture is repeated for the other tables
//TODO POST, PUT, DELETE
//Departments .................................
app.get('/departments/:id', (req, res) => { departments.getDataByPage(req, res, req.params.id) });
app.get('/departments/dept_no/:id', (req, res) => { departments.getDataByID(req, res, req.params.id) });


//TODO POST, PUT, DELETE
//Salaries .....................................
app.get('/salaries/:id', (req, res) => { salaries.getDataByPage(req, res, req.params.id) });
app.get('/salaries/emp_no/:id', (req, res) => { salaries.getDataByID(req, res, req.params.id) });


//TODO POST, PUT, DELETE
//Titles .......................................
app.get('/titles/:id', (req, res) => {  titles.getDataByPage(req, res, req.params.id) });
app.get('/titles/emp_no/:id', (req, res) => { titles.getDataByID(req, res, req.params.id) });


//TODO POST, PUT, DELETE
//Dept_Emp .....................................
app.get('/dept_emp/:id', (req, res) => { dept_emp.getDataByPage(req, res, req.params.id) });
app.get('/dept_emp/emp_no/:id', (req, res) => { dept_emp.getDataByID(req, res, req.params.id) });


//TODO POST, PUT, DELETE
//Dept_Mananger ................................
app.get('/dept_manager/:id', (req, res) => { dept_manager.getDataByPage(req, res, req.params.id) });
app.get('/dept_manager/dept_no/:id', (req, res) => { dept_manager.getDataByID(req, res, req.params.id) });
