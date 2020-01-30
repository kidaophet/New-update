const validate = require('validate.js');
const database = require('../configs/database');
class Postsloan {
    //table user
    constructor(valid = validate, db = database.MySqlDatabase) {
        this._database = new db();
        this._validate = valid;
        this._validate.validators.presence.message = 'ຫ້າມເປັນຄ່າວ່າງ';
        this._validate.validators.format.message = 'ບໍ່ຖືກຕ້ອງຕາມຮູບແບບ';
        this._validate.validators.numericality.message = 'ເປັນໂຕເລກເທົ່ານັ້ນ';
        this.validate_rules = {
            // cus_id: {
            //     presence: {
            //         allowEmpty: false
            //     }
            // },
            em_id: {
                presence: {
                    allowEmpty: false
                }
            },
            create_loan_date: {
                presence: {
                    allowEmpty: false
                }
            },
            Date_loan: {
                presence: {
                    allowEmpty: false
                }
            },
            term: {
                presence: {
                    allowEmpty: false
                }
            },
            pri_id: {
                presence: {
                }
            },
            rate_id: {
                presence: {
                }
            }                      
        };
    }
    selectAll() {
        return this._database.query('SELECT*from loan');
    }
    async selectOne(loan_id) {
        const errors = this._validate({ loan_id }, {loan_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from loan where loan_id=?', [loan_id]);
        return items.length == 0 ? null : items[0];
    }
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._database.query('insert into loan value(0, ?, ?, ?, ?, ?, ?)',
        [
            value['em_id'],
            value['create_loan_date'],
            value['Date_loan'],
            value['term'],
            value['pri_id'],
            value['rate_id']
        ])
        return await this.selectOne(item.insertId);
    }
    async update(loan_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ loan_id }, { loan_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query
        (`
            update loan set 
                em_id=?,
                create_date=?,
                Date_loan=?,
                term=?,
                rate_id=?
                pri_id=?
            where loan_id = ?`, [
            // value['cus_id'],
            value['em_id'],
            value['create_date'],
            value['Date_loan'],
            value['term'],
            value['pri_id'],
            value['rate_id'],
            loan_id
            ]);
        return await this.selectOne(loan_id);
    }
    async delete(loan_id) {
        const errors = this._validate({ loan_id }, { loan_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from loan where loan_id=?', [loan_id]);
    }
}
module.exports=Postsloan;


