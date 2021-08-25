//Database connection
const connection = require('../db/connection');
const db_connection = connection.connection();

/**
 * Description: Returns the whole table with pagination, each page will show 100 results
 */
getDataByPage = (req, res, page) => {
    let sql = ` SELECT * FROM employees`;

    return db_connection.query(sql, (error, results)=>{
        if(error){
            throw error;
        }else{
            //if the selected table contents more than 100 register, it will
            //only return the first 100 
            if(results.length > 0){
                if(results.length>100){
                    let arr = [];
                    let nextPage = (page == 1) ? 0: page*100;
                    for(let i = 0+nextPage; i < 100+nextPage; i++){ arr.push(results[i]); }
                    res.json(arr);
                }else{
                    res.json(results);
                }
            }
            else{
                res.send('No Results Found - Empty Table');
            }
        }
    });
};//End of getData


/**
 * Description: Returns a single element corresponding to the givne id
 */
getDataByID = (req, res, id) => {
    let sql = `SELECT * FROM employees WHERE emp_no = ?`;

    return db_connection.query(sql, id, (error, results) => {
        if(error){
            throw error;
        }
        else if(results.length > 0){
            res.json(results);
        } else {
            res.send('There is no employee with the given Employee Number')
        }
    });
};//End of getDataByID


/**
 * Description: Adds a new row to the table
 */
postAddEmployee = (req, res, body) => {
    let sql = 'INSERT INTO employees SET ?';

    const newEmployee = {
        emp_no: body.emp_no,
        birth_date: body.birth_date,
        first_name: body.first_name,
        last_name: body.last_name,
        gender: body.gender,
        hire_date: body.hire_date
    };

    return db_connection.query(sql, newEmployee, error => {
        if(error){
            throw error;
        }else{
            res.send('New Employee added');
        }
    });

};//End of postAddEmployee


/**
 * Description: Updates a row with the given ID
 */
putUpdateEmployee = (req, res, id, body) => {
    let sql = `UPDATE employees SET birth_date="${body.birth_date}", first_name="${body.first_name}", last_name="${body.last_name}", gender="${body.gender}", hire_date="${body.hire_date}" WHERE emp_no=?`;

    return db_connection.query(sql, id, error => {
        if(error){
            throw error;
        }else{
            res.send(`Employe: ${id} updated succesfully`)
        }
    })
};//End of putUpdateEmployee


/**
 * Description: Deletes a row corresponded to the given ID
 */
deleteEmployeeByID = (req, res, id) => {
    let sql = `DELETE FROM employees WHERE emp_no = ?`;

    return db_connection.query(sql, id, error => {
        if(error){
            throw error;
        }else{
            res.send(`Employee with id: ${id} deleted succesfully`);
        }
    });
};//End of deleteEmployeeByID


module.exports = {getDataByPage, getDataByID, postAddEmployee, putUpdateEmployee, deleteEmployeeByID};