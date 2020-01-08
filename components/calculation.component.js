const validate = require('validate.js');
const database = require('../configs/database');
const calcul = require('../formular/function');

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
            principlepay: {
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

            rate_id: {
                presence: {
                    allowEmpty: false
                }
            },

            loan_id: {
                presence: {
                    allowEmpty: false
                }
            },

            out_id: {
                presence: {
                    allowEmpty: false
                }
            },

            pri_id: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }
    // show all info
    selectAll() {
        return this._database.query('SELECT calculation.principlepay,calculation.normal_interest,calculation.penalty_interest,rate.normal_rate,rate.penalty_rate,loan.term,principal.principle\
        from calculation\
        JOIN rate ON rate.rate_id=calculation.rate_id\
        JOIN loan ON loan.loan_id=calculation.loan_id\
        JOIN principal on principal.pri_id=calculation.pri_id');
    }
    // show orderby ID
    async selectOne(cal_id) {
        const errors = this._validate({ cal_id }, {cal_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('SELECT * FROM calculation where cal_id=?', [cal_id]);
        return items.length == 0 ? null : items[0];
    }
    // insert new info
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const func_c_rate = new calcul();
        let rate_c = func_c_rate.calculation(
            value['principlepay'],
            value['normal_interest'],
            value['penalty_interest'],
            value['rate_id'],
            value['loan_id'],
            value['out_id'],
            value['pri_id'],
            value['pay_id']
        );
        const item = await this._database.query('insert into calculation value(0, ?, ?, ?, ?, ?, ?, ?, ?)', [
            rate_c.pp,
            rate_c.nor,
            rate_c.pen,
            value['rate_id'],
            value['loan_id'],
            value['out_id'],
            value['pri_id'],
            value['pay_id']
        ]);
        return await this.selectOne(calcul.insertId);
    }
    // Update new info
    async update(cal_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ cal_id }, { cal_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        const cal_func= new calcul();
        let cal_rate = cal_func.calculation(
            value['principlepay'],
            value['normal_interest'],
            value['penalty_interest'],
            value['rate_id'],
            value['loan_id'],
            value['out_id'],
            value['pri_id'],
            value['pay_id']
        );
            await this._database.query(
            `update calculation set 
            principlepay=?,
            normal_interest=?,
            penalty_interest = ?, 
            rate_id = ?,
            loan_id = ?,
            out_id = ?,
            pri_id=?,
            pay_id
            where cal_id = ?`
             [
                cal_rate.pp,
                cal_rate.nor,
                cal_rate.pen,
                value['rate_id'],
                value['loan_id'],
                value['out_id'],
                value['pri_id'],
                value['pay_id'],
            cal_id
            ]);
        return await this.selectOne(cal_id);
    }
    // Delete
    async delete(cal_id) {
        const errors = this._validate({ cal_id }, { cal_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from calculation where cal_id=?', [cal_id]);
    }
}
module.exports=Postcal;