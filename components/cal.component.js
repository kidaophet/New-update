const validate = require('validate.js');
const database = require('../configs/database');
const calcal = require('../formular/function');
class Postcal{
    //table user
    constructor(valid = validate, db = database.MySqlDatabase) {
        // use Database
        this._database = new db();
        // create Validate
        this._validate = valid;
        this._validate.validators.presence.message = 'ຫ້າມເປັນຄ່າວ່າງ';
        this._validate.validators.numericality.message = 'ເປັນໂຕເລກເທົ່ານັ້ນ';
        this.validate_rules = {
            date: {
                presence: {
                    allowEmpty: false
                }
            },

            normal_interest: {
                presence: {
                    allowEmpty: false
                }
            },

            penalty_interest: {
                presence: {
                    allowEmpty: false
                }
            },
            outstanding_days: {
                presence: {
                    allowEmpty: false
                }
            },

            total: {
                presence: {
                    allowEmpty: false
                }
            },

            remain: {
                presence: {
                    allowEmpty: false
                }
            },

            amount: {
                presence: {
                    allowEmpty: false
                }
            },
            pri_id: {
                presence: {
                    allowEmpty: true
                }
            },
            rate_id: {
                presence: {
                    allowEmpty: true
                }
            },
            out_id: {
                presence: {
                    allowEmpty: true
                }
            }
            

        }
    }
    // show all info
    selectAll() {
        return this._database.query('SELECT*from cal');
    }
    // show orderby ID
    async selectOne(id) {
        const errors = this._validate({ id }, {id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('SELECT * FROM cal where id=?', [id]);
        return items.length == 0 ? null : items[0];
    }
    // insert new info
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const func_c_rate = new calcal();
        let rate_c = func_c_rate.calculate(
            value['date'],
            value['principle'],
            value['normal_rate'],
            value['penalty_rate'],
            value['term'],
            value['total'],
            value['remain'],
            value['amount'],
            value['date_pay']
        );
        const item = await this._database.query('insert into cal value(0, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            value['date'],
            rate_c.principlepay,
            rate_c.normal_interest,
            rate_c.penalty_interest,
            rate_c.outstanding_days,
            value['total'],
            value['remain'],
            value['amount'],
            value['date_pay']
        ]);
        return await this.selectOne(cal.insertId);
    }
    // Update new info
    async update(id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ id }, { cal_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        const cal_func= new calcal();
        let cal_rate = cal_func.calculate(
            // value['principle'],
            // value['normal_rate'],
            // value['penalty_rate'],
            // value['term'],
            // value['outstanding_days']
            value['date'],
            value['principlepay'],
            value['normal_interest'],
            value['penalty_interest'],
            value['outstanding_days'],
            value['total'],
            value['remain'],
            value['amount'],
            value['date_pay']
        );
            await this._database.query(
            `update cal set 
            date=?,
            principlepay=?,
            normal_interest=?,
            penalty_interest = ?, 
            outstanding_days = ?,
            total = ?,
            remain = ?,
            amount=?,
            date_pay=?
            where id = ?`
             [  date,
                cal_rate.pp,
                cal_rate.nor,
                cal_rate.pen,
                value['outstanding_days'],
                value['total'],
                value['remain'],
                value['amount'],
                value['date_pay'],
            id
            ]);
        return await this.selectOne(id);
    }
    // Delete
    async delete(id) {
        const errors = this._validate({ id }, { id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from calculation where cal_id=?', [id]);
    }
}
module.exports=Postcal;