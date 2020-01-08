const validate = require('validate.js');
const database = require('../configs/database');
const pay = require('../formular/pay');
class Postpay{
    constructor(valid = validate, db = database.MySqlDatabase) {
        // use Database
        this._database = new db();
        // create Validate
        this._validate = valid;
        this._validate.validators.presence.message = 'ຫ້າມເປັນຄ່າວ່າງ';
        this._validate.validators.numericality.message = 'ເປັນໂຕເລກເທົ່ານັ້ນ';
        this.validate_rules = {
            Amount: {
                presence: {
                    allowEmpty: false
                }
            },
            Date_pay: {
                presence: {
                    allowEmpty: false
                }
            },
            em_id: {
                presence: {
                    allowEmpty: false
                }
            },
            cus_id: {
                presence: {
                    allowEmpty: false
                }
            },
            cal_id: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }
    // show all info
    selectAll() {
        return this._database.query(`SELECT payment.pay_id,payment.Amount,payment.Date_pay,calculation.principlepay,calculation.normal_interest,calculation.penalty_interest,user.name,customer.firstname
        FROM payment
        JOIN user ON user.em_id=payment.em_id
        JOIN customer ON customer.cus_id=payment.cus_id
        JOIN calculation ON calculation.cal_id=payment.cal_id`);
    }
    // show orderby ID
    async selectOne(pay_id) {
        const errors = this._validate({ pay_id }, {pay_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('SELECT * FROM payment where pay_id=?', [pay_id]);
        return items.length == 0 ? null : items[0];
    }
    // insert new info
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const func_pay = new pay();
        let rate_pay = func_pay.payment(
            value['Amount'],
            value['Date_pay'],
            value['em_id'],
            value['cus_id'],
            value['cal_id']
        );
        const item = await this._database.query('insert into payment value(0, ?, ?, ?, ?, ?)', [
            value['Amount'],
            value['Date_pay'],
            value['em_id'],
            value['cus_id'],
            rate_pay.cal_id
        ]);
        return await this.selectOne(pay.insertId);
    }
    // Update new info
    async update(pay_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ pay_id }, { pay_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        const pay_func= new pay();
        let pay_rate = pay_func.payment(
            value['Amount'],
            value['Date_pay'],
            value['em_id'],
            value['cus_id'],
            value['cal_id']
        );
            await this._database.query(
            `update payment set 
            Amount=?,
            Date_pay=?,
            em_id = ?, 
            cus_id = ?,
            cal_id = ?,
            where pay_id = ?`
             [
            value['Amount'],
            value['Date_pay'],
            value['em_id'],
            value['cus_id'],
            value['cal_id'],
            pay_id
            ]);
        return await this.selectOne(pay_id);
    }
    // Delete
    async delete(pay_id) {
        const errors = this._validate({ pay_id }, { pay_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from payment where pay_id=?', [pay_id]);
    }
}
module.exports=Postpay;