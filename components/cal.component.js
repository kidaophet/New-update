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
            value['normalInterest'],
            value['penaltyInterest'],
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
    async update(loan_id, value) {    
        let last_pay = await(loan_id);
        let pricinplepay = last_pay.pricinplepay;
        let normal_interest = last_pay.normal_interest;
        let total = last_pay.total;


        let penalty_rate = value['penalty_rate'];
        let term = value['term'];
        let outstanding_days = value['outstanding_days'];
        let normal_rate = value['normalInterest'];
        
        const cal_func= new calcal();
        let cal_rate  = cal_func.calculate(
            pricinplepay,
            penaltyInterest,
            normalInterest,
            term,
            outstanding_days
        );
        return value[loan_id];

        let amount = value['amount']
        let date_pay = value['date']
        date_pay - last_pay.date
            
        // ກໍລະນີຈ່າຍຊ້າ
        for(i=1;i<+term;i++){
            //ກໍລະນີຜົນບວກທັງໝົດຂອງຄ່າທີ່ຕ້ອງຈ່າຍນ້ອຍກວ່າເງີນທີ່ ເຂົາຈ່າຍມາ
           if(amount<sum){
                let penpay =amount-penalty_interest;
                //ຖ້າເງີນທີ່ຈ່າຍຄ່າດອກເບ້ຍປັບໃໝ ຫຼາຍກວ່າສູນ
                if(penpay>0){
                    let norpay=penpay-normal_interest;
                    // console.log('ດອກເບ້ຍທີ່ຕ້ອງຈ່າຍ:'+norpay);
                    //ຖ້າເງີນທີ່ຈ່າຍຄ່າດອກເບ້ຍ ຫຼາຍກວ່າສູນ
                    if(norpay>0){

                        let pripay=norpay-pp;
                        //ຖ້າເງີນທີ່ຈ່າຍຄ່າດອກເບ້ຍນ້ອຍກວ່າສູນ

                    }else if(norpay<=0){
                        // console.log('ດອກເບ້ຍປັບໃໝທີ່ຕ້ອງຈ່າຍ:'+pripay);
                    }
                    //ຖ້າເງີນທີ່ຈ່າຍຄ່າດອກເບ້ຍປັບໃໝ ນ້ອຍກວ່າຫຼືເທົ່າກັບສູນ
                }else if(penpay<=0){
                    let sum2=principlepay+normal_interest;
                    // console.log('ສະແດງຄ່າຜົນບວກ:'+sum2);
                }
                //ກໍລະນີຜົນບວກທັງໝົດຂອງຄ່າທີ່ຕ້ອງຈ່າຍຫຼາຍກວ່າເງີນທີ່ ເຂົາຈ່າຍມາ
            }else if(amount>sum){
                let Total=amount-sum;

        
                // console.log('ເງີນທີ່ຍັງເຫຼືອ:'+Total);
                //ກໍລະນີຜົນບວກທັງໝົດຂອງຄ່າທີ່ຕ້ອງຈ່າຍເທົ່າເງີນທີ່ ເຂົາຈ່າຍມາ
            }else if(amount==sum){
            // console.log('ຈ່າຍແລ້ວ');
            }
        }
    }

    // Delete
    async delete(id) {
        const errors = this._validate({ id }, { id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from calculation where cal_id=?', [id]);


    }
}
module.exports=Postcal;
