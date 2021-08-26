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
//Departments .................................
app.get('/departments/:id', (req, res) => { departments.getDataByPage(req, res, req.params.id) });
app.get('/departments/dept_no/:id', (req, res) => { departments.getDataByID(req, res, req.params.id) });
app.post('/departments/addDepartment', (req, res) => { departments.postAddDepartment(req, res, req.body) });
app.put('/departments/updateDepartmentBy_dept_no/:id', (req, res) => { departments.putUpdateDepartmentByID(req, res, req.params.id, req.body) });
app.delete('/departments/deleteDepartmentBy_dept_no/:id', (req, res) => { departments.deleteDepartmentByID(req, res, req.params.id) });


//Salaries .....................................
app.get('/salaries/:id', (req, res) => { salaries.getDataByPage(req, res, req.params.id) });
app.get('/salaries/emp_no/:id', (req, res) => { salaries.getDataByID(req, res, req.params.id) });
app.post('/salaries/addSalary', (req, res) => { salaries.postAddSalary(req, res, req.body) });
app.put('/salaries/updateBy_emp_no/:id', (req, res) => { salaries.putUpdateSalary(req, res, req.params.id, req.body) });
app.delete('/salaries/delete', (req, res) => { salaries.deleteSalary(req, res, req.body) });


//Titles .......................................
app.get('/titles/:id', (req, res) => {  titles.getDataByPage(req, res, req.params.id) });
app.get('/titles/emp_no/:id', (req, res) => { titles.getDataByID(req, res, req.params.id) });
app.post('/titles/addTitle', (req, res) => { titles.postAddTitle(req, res, req.body) });
app.put('/titles/updateTitle/:id', (req, res) => { titles.putUpdateTitle(req, res, req.params.id, req.body) });
app.delete('/titles/deleteTitle/:id', (req, res) => { titles.deleteTitle(req, res, req.params.id) });

