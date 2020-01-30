
const validate = require('validate.js');
const database = require('../configs/database');
const calcul = require('../formular/function');
class Postscustomer {
    //table customer
    constructor(valid = validate, db = database.MySqlDatabase) {
        // ใช้งาน Database
        this._database = new db();
        // สร้าง Validate
        this._validate = valid;
        this._validate.validators.presence.message = 'ຫ້າມເປັນຄ່າວ່າງ';
        this._validate.validators.format.message = 'ບໍ່ຖືກຕ້ອງຕາມຮູບແບບ';
        this._validate.validators.numericality.message = 'ເປັນໂຕເລກເທົ່ານັ້ນ';
        this.validate_rules = {
            firstname: {
                presence: {
                    allowEmpty: false
                }
            },
            Surname: {
                presence: {
                    allowEmpty: false
                }
            },
            gender: {
                presence: {
                    allowEmpty: false
                }
            },
            Address: {
                presence: {
                    allowEmpty: false
                }
            },
            Contact: {
                presence: {
                    allowEmpty: false
                }
            },
            
            Email: {
                presence: {
                    allowEmpty: false
                }
            },
            evidence: {
                presence: {
                    allowEmpty: false
                }
            },
            loan_id: {
                presence: {
                    allowEmpty: false
                }
            },
            rate_id: {
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
    //show all data
    selectAll() {
        return this._database.query(`SELECT loan.loan_id,customer.cus_id,customer.firstname,customer.surname,loan.create_loan_date,loan.Date_loan,loan.term,principal.principle
        from loan
        JOIN customer ON customer.cus_id=loan.cus_id
        JOIN principal ON principal.pri_id=loan.pri_id`);
    }
    // show one data
    async selectOne(cus_id) {
        const errors = this._validate({ cus_id }, {cus_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from customer where cus_id=?', [cus_id]);
        return items.length == 0 ? null : items[0];
    }
   // add new data
   async create(value) {
    // const errors = this._validate(value, this.validate_rules);
    let Date_loan = new Date()
    // if (errors) throw { errors };
    const item2 = await this._database.query('insert into rate value(0, ?, ?)', [
        value['normalInterest'],
        value['penaltyInterest']
    ])
    const item3 = await this._database.query('insert into principal value(0, ?)', [
        value['principle']
    ])
    const item = await this._database.query('insert into customer value(0, ?, ?, ?, ?, ?, ?, ?)', [
        value['firstname'],
        value['surname'],
        value['gender'],
        value['address'],
        value['contact'],
        value['email'],
        value['evidence']
    ])    
    const item1 = await this._database.query('insert into loan value(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        "1",
        value['create_loan_date'],
        Date_loan,
        value['term'],
        item3.insertId,
        item2.insertId,
        "NULL",
        "NULL",
        "NULL",
        item.insertId
    ])
    const func_c_rate = new calcul();
    let cal = func_c_rate.calculate(
        value['principle'],
        value['normalInterest'],
        value['penaltyInterest'],
        value['term'],
        '0'
    );

    var i;
    let remain = null;
    let amount = null;
    let date_pay = null;
    for(i=0;i<value['term'];i++){
    const item5 = await this._database.query('insert into cal value(0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        value['create_loan_date'],
        cal.principlecal,
        cal.normalcal,
        cal.penaltycal,
        "0",
        cal.totalcal,
        remain,
        amount,
        date_pay,
        item1.insertId
         ]);
    }
    ////////////////////////////////

    // let out = func_c_rate.outstand(
    //     value['date'],
    //     value['date_pay']  
    // );
    
    // const item6 = await this._database.query('insert into outstanding_days value(0, ?, ?, ?)', [
    //     value['pay_id'],
    //     out.outstandingcal,
    //     value['id']
    //      ]);
    return cal;
    // return await this.selectOne(item,item1,item2,item3,item4.insertId);
}
    // modify data
    async update(cus_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ cus_id }, { cus_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        const item2 = await this._database.query('\
        normalInterest=?,\
        penaltyInterest=?\
        where rate_id=?', [
            value['normalInterest'],
            value['penaltyInterest'],
            rate_id
        ])
        const item3 = await this._database.query('\
        principle=?\
        where pri_id=?', [
            value['principle'],
            pri_id
        ])
        await this._database.query(`
            update customer set 
                firstname = ?, 
                Surname = ?,
                gender = ?,
                Address = ?,
                Contact = ?,
                Email=?,
                evidence = ?
               
            where cus_id = ?`, [
                value['firstname'],
                value['Surname'],
                value['gender'],
                value['Address'],
                value['Contact'],
                value['Email'],
                value['evidence'],
                cus_id
            ])
            await this._database.query('\
            update loan set\
            em_id=?,\
            create_loan_date=?,\
            Date_loan=?,\
            term=?,\
            pri_id=?,\
            rate_id=?\
            where rate_id=?', 
            [
                value['em_id'],
                value['create_loan_date'],
                value['Date_loan'],
                value['term'],
                value['pri_id'],
                value['rate_id'],
                loan_id
            ])
        return await this.selectOne(rate_id,pri_id,cus_id,loan_id);
    }

    // delete data
    async delete(cus_id) {
        const errors = this._validate({ cus_id }, { cus_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from customer where cus_id=?', [cus_id]);
    }
    }
    module.exports=Postscustomer;