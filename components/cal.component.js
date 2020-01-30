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
    async LoanAmortization(loan_id) {
        const result = await this._database.query(`SELECT loan.loan_id,principal.principle,loan.term,rate.normalInterest,rate.penaltyInterest,cal.amount,cal.normal_interest+cal.penalty_interest,cal.date,
        principal.principle,cal.pricinplepay,cal.normal_interest,cal.outstanding_days,cal.penalty_interest,cal.pricinplepay+cal.normal_interest+cal.penalty_interest
        from loan
        JOIN principal ON principal.pri_id=loan.pri_id
        JOIN rate ON rate.rate_id=loan.rate_id
        JOIN cal ON cal.loan_id=loan.loan_id
        WHERE loan.loan_id = ?`, [loan_id]);
        return result[0];
    }
    async SelectLastPayment(loan_id) {
        const result = await this._database.query('SELECT * FROM cal WHERE loan_id=? AND (remain IS NULL OR remain != 0) ORDER BY id ASC LIMIT 1', [loan_id]);
        return result[0];
    }
    async Outstandingdays(loan_id){
       const datelast = await this._database.query('SELECT * FROM cal WHERE loan_id=? AND cal.date_pay IS NULL  ORDER BY id ASC LIMIT 1',[loan_id]);
        var secondDate= moment(datelast);
        var firstDate = moment(date);
        var days = Math.abs(firstDate.diff(secondDate,'days'));  
       return days;
    }
    async RemainOutstandingdays(loan_id){
        const datelast = await this._database.query('SELECT * FROM cal WHERE loan_id=? AND cal.date_pay IS NOT NULL AND remain > 0  ORDER BY id ASC LIMIT 1',[loan_id]);
         let days=1000*60*60*24;
         let current_date = new Date();
         let diffTime= Math.abs(Date.parse(current_date)- Date.parse(datelast[0].date_pay));  
         var od = Math.ceil(diffTime / days);  
        return od;
     }
     async RemainPenaltyInterest(loan_id){
        const pen = await this._database.query('SELECT rate.penaltyInterest\
        FROM loan\
        JOIN rate ON rate.rate_id=loan.rate_id\
        WHERE loan.loan_id=?',[loan_id]);
        const prin = await this._database.query('SELECT principal.principle\
        FROM loan\
        JOIN principal ON principal.pri_id=loan.pri_id\
        WHERE loan.loan_id=?',[loan_id]);
        const loan = await this._database.query('SELECT * FROM `loan`\
        WHERE loan_id=?',[loan_id]);
        let term = loan[0].term;
        let overdays = await this.RemainOutstandingdays(loan_id);
        let penaltyInterest = parseFloat(prin[0].principle)*parseFloat(pen[0].penaltyInterest/100/term)*parseInt(overdays);
        return penaltyInterest;
    }
    async penaltyInterest(loan_id){
        const pen = await this._database.query('SELECT rate.penaltyInterest\
        FROM loan\
        JOIN rate ON rate.rate_id=loan.rate_id\
        WHERE loan.loan_id=?',[loan_id]);
        const prin = await this._database.query('SELECT principal.principle\
        FROM loan\
        JOIN principal ON principal.pri_id=loan.pri_id\
        WHERE loan.loan_id=?',[loan_id]);
        const loan = await this._database.query('SELECT * FROM `loan`\
        WHERE loan_id=?',[loan_id]);
        let term = loan[0].term;
        let overdays = await this.Outstandingdays(loan_id);
        let penaltyInterest = parseFloat(prin[0].principle)*parseFloat(pen[0].penaltyInterest/100/term)*parseInt(overdays);
        return penaltyInterest;
    }
    // let overdays=await this.Outstandingdays(loan_id);
// Update new info
    async update(loan_id, value) {    
        let amount = value['amount'];
        let payment1 = await this.PaymentLoop(loan_id, amount);
        if(payment1 > 0){
            let payment2 = await this.PaymentLoop(loan_id, payment1);
            if(payment2 > 0){
                let payment3 = await this.PaymentLoop(loan_id, payment2);           
                if(payment3 > 0){
                    let payment4 = await this.PaymentLoop(loan_id, payment3);
                    if(payment4 > 0){
                        let payment5 = await this.PaymentLoop(loan_id, payment4);                
                        if(payment5 > 0){
                            let payment6 = await this.PaymentLoop(loan_id, payment5);                
                            if(payment6 > 0){
                                let payment7 = await this.PaymentLoop(loan_id, payment6);                
                                if(payment7 > 0){
                                    let payment8 = await this.PaymentLoop(loan_id, payment7);                
                                    if(payment8 > 0){
                                        let payment9 = await this.PaymentLoop(loan_id, payment8);
                                        if(payment9 > 0){
                                            let payment10 = await this.PaymentLoop(loan_id, payment9);           
                                            if(payment10 > 0){
                                                let payment11 = await this.PaymentLoop(loan_id, payment10);
                                                if(payment11 > 0){
                                                    let payment12 = await this.PaymentLoop(loan_id, payment11);                
                                                    if(payment12 > 0){
                                                        let payment13 = await this.PaymentLoop(loan_id, payment12);                
                                                        if(payment13 > 0){
                                                            let payment14 = await this.PaymentLoop(loan_id, payment13);                
                                                            if(payment14 > 0){
                                                                let payment15 = await this.PaymentLoop(loan_id, payment14);                
                                                            }
                                                        } 
                                                    } 
                                                }                    
                                            }     
                                        }
                                    }
                                }
                            } 
                        } 
                    }                    
                }     
            }
        }
        return payment1;
    }
    async PaymentLoop(loan_id, amount) {
        let last_pay = await this.SelectLastPayment(loan_id);
        let cal_id = last_pay.id;
        let pricinplepay = last_pay.pricinplepay;
        let normalInterest = last_pay.normal_interest;
        let LastPenaltyInterest = last_pay.penalty_interest;
        let LastOutstanding_days = last_pay.outstanding_days;
        let total = 0;
        if(last_pay.remain > 0){
            let NewPenaltyInterest = await this.RemainPenaltyInterest(loan_id);
            let outstanding_days = await this.RemainOutstandingdays(loan_id);
            outstanding_days += LastOutstanding_days;
            let sum = last_pay.remain + NewPenaltyInterest;
            NewPenaltyInterest += LastPenaltyInterest;
            total = pricinplepay + normalInterest + NewPenaltyInterest;
            let payment = this.Payment(amount, sum, NewPenaltyInterest, outstanding_days, cal_id, total);
            return payment
        }

        let penaltyInterest = await this.penaltyInterest(loan_id);
        let outstanding_days = await this.Outstandingdays(loan_id);
        let sum = last_pay.total + penaltyInterest;
        let payment = this.Payment(amount, sum, penaltyInterest, outstanding_days, cal_id, total);
        return payment
    }
    async Payment(amount, sum, penaltyInterest, outstanding_days, cal_id, total){
        let date_pay = new Date();
        let remain = 0;
        let over = null;
        if(amount<sum){
            remain = sum - amount;
            await this._database.query(`
            update cal set 
            penalty_interest = ?, 
            outstanding_days = ?,
            total = ?,
            remain = ?,
            amount = ?,
            date_pay=?
               
            where id = ?`, [
                penaltyInterest,
                outstanding_days,
                sum,
                remain,
                amount,
                date_pay,
                cal_id
            ])
            over = 0;
            return over;
        }else if(amount>sum){
            await this._database.query(`
            update cal set 
            penalty_interest = ?, 
            outstanding_days = ?,
            total = ?,
            remain = ?,
            amount = ?,
            date_pay=?
               
            where id = ?`, [
                penaltyInterest,
                outstanding_days,
                total,
                remain,
                amount,
                date_pay,
                cal_id
            ])
            over = amount - sum;
            return over;
        }else if(amount == sum){
            await this._database.query(`
            update cal set 
            penalty_interest = ?, 
            outstanding_days = ?,
            total = ?,
            remain = ?,
            amount = ?,
            date_pay=?
               
            where id = ?`, [
                penaltyInterest,
                outstanding_days,
                sum,
                remain,
                amount,
                date_pay,
                cal_id
            ])
            over = 0;
            return over;
        }
    }
    // Delete
    async delete(id) {
        const errors = this._validate({ id }, { id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from cal where cal_id=?', [id]);


    }
}
module.exports=Postcal;
