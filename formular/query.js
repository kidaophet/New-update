const database = require('../configs/database');

async function SelectLastPayment(loan_id) {
    const result = await this._database.query('SELECT * FROM cal WHERE loan_id=? AND (remain IS NULL OR remain != 0) ORDER BY id ASC LIMIT 1', [loan_id]);
    let pay_last='{"result":'+result+'}';
        let lastpay=JSON.parse(pay_last);
        return result[0];
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
