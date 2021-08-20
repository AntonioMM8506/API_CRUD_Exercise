//Dependencies --------------------------------------------------------
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

//Database Connection -------------------------------------------------
const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

conection.connect(error => {
    if(error){
        throw " !!!!! ERROR: " + error + " !!!!!"
    }else{
        console.log('---------- Database connection succesfull ----------');
    }
});

// Port Listening
app.listen(port, () => console.log('Server Running on PORT: ' + port));


//End points ----------------------------------------------------------
//Welcome Page
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

//Returns the whole table
app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';

    conection.query(sql, (error, results)=>{
        if(error){
            throw error;
        }else{
            //if the selected table contents more than 100 register, it will
            //only return the first 100;
            if(results.length > 0){
                if(results.length>100){
                    let arr = [];
                    for(let i = 0; i<100; i++){ arr.push(results[i]); }
                    res.json(arr);
                }else{
                    res.json(results);
                }
            }
            else{
                res.send('No Results Found - Empty Table');
            }
        }
    } );
});

//Returns the employee according to the given id
app.get('/employees/:id', (req, res) => {
    res.send('Get employee by id');
});

//Adds a whole row into the table
app.post('addEmployee', (req, res) => {
    res.send('New Employee');
});

//Updates a row according to the given id
app.put('/update/:id', (req, res) => {
    res.send('Update Employee');
});

//Deletes a row according to the given id
app.delete('/delete/:id', (req, res)=>{
    res.send('Delete Employee');
});

