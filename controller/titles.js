//Database connection
const connection = require('../db/connection');
const db_connection = connection.connection();

/**
 * Description: Returns the whole table with pagination, each page will show 100 results
 */
getDataByPage = (req, res, page) => {
    let sql = "SELECT * FROM `titles`";

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
    let sql = "SELECT * FROM `titles` WHERE `emp_no`=?";

    return db_connection.query(sql, id, (error, results) => {
        if(error){
            throw error;
        }
        else if(results.length > 0){
            res.json(results);
        } else {
            res.send('There is no Title with the given Employee Number')
        }
    });
};//End of getDataByID

/**
 * Description: Adds a new row to the table
 */
postAddTitle = (req, res, body) => {
    let sql = 'INSERT INTO `titles` SET ?';

    const newTitle = {
        emp_no: body.emp_no,
        title: body.title,
        from_date: body.from_date,
        to_date: body.to_date,
    };

    return db_connection.query(sql, newTitle, error => {
        if(error){
            throw error;
        }else{
            res.send('New Title added');
        }
    });
};//End of postAddTitle


/**
 * Description: Updates a row with the given ID
 */
putUpdateTitle = (req, res, id, body) => {
    let sql = "UPDATE `titles` SET `title`=?, `from_date`=?, `to_date`=? WHERE `emp_no`=? AND `title`=?";
    const args = [body.newTitle, body.from_date, body.to_date, id, body.currentTitle];

    return db_connection.query(sql, args, error => {
        if(error){
            throw error;
        }else{
            res.send(`Employe Title with: ${id} updated succesfully`)
        }
    });
};//End of putUpdateTitle


/**
 * Description: Deletes a row corresponded to the given ID
 */
deleteTitle = (req, res, id) => {
    let sql = "DELETE FROM `titles` WHERE emp_no = ?";

    return db_connection.query(sql, id, error => {
        if(error){
            throw error;
        }else{
            res.send(`Employee with id: ${id} all titles deleted succesfully`);
        }
    });
};//End of deleteTitle


module.exports = {getDataByPage, getDataByID, postAddTitle, putUpdateTitle, deleteTitle};
