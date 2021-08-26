//Stablish the database connection with mysql dependency
require('dotenv').config();
const mysql = require('mysql2');

//TODO - Avoid SQL Injection
//Database Connection -------------------------------------------------
function connection(){
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
}

connection().connect(error => {
    if(error){
        throw " !!!!! ERROR: " + error + " !!!!!"
    }else{
        console.log('---------- Database connection succesfull ----------');
    }
});

module.exports = {connection};