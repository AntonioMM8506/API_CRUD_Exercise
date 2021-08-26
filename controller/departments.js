//Database connection
const connection = require('../db/connection');
const db_connection = connection.connection();

/**
 * Description: Returns the whole table with pagination, each page will show 100 results
 */
getDataByPage = (req, res, page) => {
    let sql = "SELECT * FROM `departments`";

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
    let sql = "SELECT * FROM `departments` WHERE `dept_no`=?";

    return db_connection.query(sql, id, (error, results) => {
        if(error){
            throw error;
        }
        else if(results.length > 0){
            res.json(results);
        } else {
            res.send('There is no Department with the given Department Number')
        }
    });
};//End of getDataByID

/**
 * Description: Adds a new row to the table
 */
postAddDepartment = (req, res, body) => {
    let sql = 'INSERT INTO `departments` SET ?';

    const newDept = {
        dept_no: body.dept_no,
        dept_name: body.dept_name
    };

    return db_connection.query(sql, newDept, error => {
        if(error){
            throw error;
        }else{
            res.send('New Department added');
        }
    });
};//End of postAddDepartment


/**
 * Description: Updates a row with the given ID
 */
putUpdateDepartmentByID = (req, res, id, body) => {
    let sql = "UPDATE `departments` SET `dept_name`=? WHERE `dept_no`=?";
    let args = [body.dept_name, id];

    return db_connection.query(sql, args, error => {
        if(error){
            throw error;
        }else{
            res.send(`Department: ${id} name updated succesfully`)
        }
    });
};//End of putUpdateDepartmentByID


/**
 * Description: Deletes a row corresponded to the given ID
 */
deleteDepartmentByID = (req, res, id) => {
    let sql = "DELETE FROM `departments` WHERE `dept_no`= ?";

    return db_connection.query(sql, id, error => {
        if(error){
            throw error;
        }else{
            res.send(`Department with id: ${id} deleted succesfully`);
        }
    });
};//End of deleteDepartmentByID


module.exports = {getDataByPage, getDataByID, postAddDepartment, putUpdateDepartmentByID, deleteDepartmentByID};