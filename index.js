//Dependencies --------------------------------------------------------
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

//Database Connection -------------------------------------------------
const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fernanda8506',
    database: 'employees'
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
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.get('/employees', (req, res) => {
    res.send('List of employees');
});

app.post('addEmployee', (req, res) => {
    res.send('New Employee');
});

app.put('/update/:id', (req, res) => {
    res.send('Update Employee');
});

app.delete('/delete/:id', (req, res)=>{
    res.send('Delete Employee');
});

