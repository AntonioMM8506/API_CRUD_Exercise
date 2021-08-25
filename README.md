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
    - To Read **(GET)**
        - The first 100 entries of a table
        ```
        http://localhost:3000/employees/1
        ```
        - An specific entrie by given ID
        ```
        http://localhost:3000/employees/emp_no/10076
        ```
    - To Insert into a table **(POST)**
        ```
        http://localhost:3000/employees/addEmployee

        {
                "emp_no": "123456",
                "birth_date": "1965-08-09",
                "first_name": "Peter",
                "last_name": "Parker",
                "gender": "M",
                "hire_date": "1998-09-06"
        }
        ```
    - To Update a specific row by given ID **(PUT)**
        ```
        http://localhost:3000/employees/updateBy_emp_no/10076

        {
            "birth_date": "1958-07-06",
            "first_name": "Selina",
            "last_name": "Kyle",
            "gender": "M",
            "hire_date": "1993-09-06"
        }
        ```
    - To Delete a specific row by given ID **(DELETE)**
        ```
        http://localhost:3000/employees/deleteBy_emp_no/10076
        ```