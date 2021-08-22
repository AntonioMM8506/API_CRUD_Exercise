# API - CRUD Exercise
## Requirements
- Load the test_db from here: https://github.com/datacharmer/test_db
- Create a WS/API using Node/Express
- Install MySQL Driver
- Create CRUD Rest Web Services for all the tables from test_db

## Instructions
- Clone the repository
- Install the database in your MySQL instance
```
mysql< employees.sql
```
- install all the framework dependencies
```
npm i 
```
- create an .env file and set the enviroment variables to stablish the data base connection
    - DB_HOST
    - DB_USER
    - DB_PASS
    - DB_NAME
- To run the application:
```
npm run dev
```
# Example
- To use the CRUD application with Postman
    - To Read (GET)
        - The first 100 entries of a table
        ```
        http://localhost:3000/employees/1
        ```
        - An specific entrie by given ID
        ```
        http://localhost:3000/employees/emp_no/10076
        ```