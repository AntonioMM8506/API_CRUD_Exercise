//Database connection
const connection = require('../db/connection');
const db_connection = connection.connection();

/**
 * Description: Returns the whole table with pagination, each page will show 100 results
 */
getDataByPage = (req, res, page) => {
    let sql = "SELECT * FROM `salaries`";

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
    let sql = "SELECT * FROM `salaries` WHERE emp_no = ?";

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
postAddSalary = (req, res, body) => {
    let sql = 'INSERT INTO `employees` SET ?';

    const newSalary = {
        emp_no: body.emp_no,
        salary: body.salary,
        from_date: body.from_date,
        to_date: body.to_date
    };

    return db_connection.query(sql, newSalary, error => {
        if(error){
            throw error;
        }else{
            res.send('New Salary added');
        }
    });
};//End of postAddSalary


/**
 * Description: Updates a row with the given ID
 */
putUpdateSalary = (req, res, id, body) => {
    let sql = "UPDATE `salaries` SET `salary`=? WHERE `emp_no`=? AND `salary`=?";
    let args = [body.newSalary, id, body.salary];

    return db_connection.query(sql, args, error => {
        if(error){
            throw error;
        }else{
            res.send(`Employe: ${id} salary updated succesfully`)
        }
    });
};//End of putUpdateSalary


/**
 * Description: Deletes a row corresponded to the given ID
 */
deleteSalary = (req, res, body) => {
    let sql = "DELETE FROM `salaries` WHERE `emp_no`=? AND `salary`=?";
    const args = [body.emp_no, body.salary];

    return db_connection.query(sql, args, error => {
        if(error){
            throw error;
        }else{
            res.send(`Record of salary deleted`);
        }
    });
};//End of deleteSalary

module.exports = {getDataByPage, getDataByID, postAddSalary, putUpdateSalary, deleteSalary};