const validate = require('validate.js');
const database = require('../configs/database');
const outs = require('../formular/function.js');
class Postsout {
    //table user
    constructor(valid = validate, db = database.MySqlDatabase) {
        // using Database
        this._database = new db();
        // create Validate
        this._validate = valid;
        this._validate.validators.presence.message = 'ຫ້າມເປັນຄ່າວ່າງ';
        this._validate.validators.format.message = 'ບໍ່ຖືກຕ້ອງຕາມຮູບແບບ';
        this._validate.validators.numericality.message = 'ເປັນໂຕເລກເທົ່ານັ້ນ';
        this.validate_rules = {
            loan_date: {
                presence: {
                    allowEmpty: false
                }
            },
            deadline: {
                presence: {
                    allowEmpty: false
                }
            },
            outstanding_days: {
                presence: {
                    allowEmpty: false
                }
            },
            principle: {
                presence: {
                    allowEmpty: false
                }
            },
            interest_rate: {
                presence: {
                    allowEmpty: false
                }
            },
            repayment: {
                presence: {
                    allowEmpty: false
                }
            },
            discount: {
                presence: {
                    allowEmpty: false
                }
            },
            balance: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }
    // Show all data
    selectAll() {
        return this._database.query('select * from outstanding_days');
    }
    // show one data
    async selectOne(out_id) {
        const errors = this._validate({ out_id }, {out_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from outstanding_days where out_id=?', [out_id]);
        return items.length == 0 ? null : items[0];
    }
    // create new
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const outst = new outs();
        let outstand = outst.outstanding_days(
            value['loan_date'],
            value['deadline'],
            value['outstanding_days'],
            value['principle'],
            value['interest_rate'],
            value['repayment'],
            value['discount'],
            value['balance']
        );
        const item = await this._database.query('insert into outstanding_days value(0, ?, ?, ?, ?, ?, ?, ?, ?)', [
            value['loan_date'],
            value['deadline'],
            outstand.od,
            outstand.ai,
            value['interest_rate'],
            value['repayment'],
            value['discount'],
            outstand.bal
        ]);
        return await this.selectOne(outs.insertId);
    }
    // แก้ไขข้อมูล
    async update(out_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ out_id }, { out_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update outstanding_days set 
            loan_date=?,
            deadline=?,
            outstanding_days = ?, 
            amount=?,
            interest_rate=?,
            repayment = ?,
            discount = ?,
            balance = ?
            where out_id = ?`, 
            [
            value['loan_date'],
            value['deadline'],
            outstand.od,
            outstand.ai,
            value['interest_rate'],
            value['repayment'],
            value['discount'],
            outstand.bal
            ]);
        return await this.selectOne(out_id);
    }
    // ลบข้อมูล
    async delete(out_id) {
        const errors = this._validate({ out_id }, { out_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from outstanding_days  where out_id=?', [out_id]);
    }
}
module.exports=Postsout;

                                                                                                                                                                                                                                                                                                                           