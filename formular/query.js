const database = require('../configs/database');

function SelectQuery(loan_id){
let  db = database.MySqlDatabase
let dbase = new db()
let result = dbase.query('SELECT * FROM cal WHERE loan_id= "1" AND (remain IS NULL OR remain != 0) ORDER BY id ASC LIMIT 1');
return result;
}

// console.log(SelectQuery(1));
function UpdateQuery(params) {
    let  db = database.MySqlDatabase
    let dbase = new db()
    let result=dbase.query(`
    UPDATE cal SET 
    penalty_interest=?,
    outstanding_days=?,
    total=?,
    remain=?,
    date_pay=?
    WHERE id=id`)
    return result;
}
