//Database connection
const connection = require('../db/connection');
const db_connection = connection.connection();

/**
 * Description: Returns the whole table with pagination, each page will show 100 results
 */
getDataByPage = (req, res, page) => {
    let sql = ` SELECT * FROM departments`;

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
    let sql = `SELECT * FROM departments WHERE dept_no = ?`;

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


module.exports = {getDataByPage, getDataByID}