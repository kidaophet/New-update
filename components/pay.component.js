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
            amount: {
                presence: {
                    allowEmpty: false
                }
            },
            date_pay: {
                presence: {
                    allowEmpty: false
                }
            },
            loan_id: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }
    // show all info
    async selectAll() {
         const a = await this._database.query(`SELECT loan.loan_id,principal.principle,loan.term,rate.normal_rate,rate.penalty_rate,payment.amount,cal.normal_interest+cal.penalty_interest,
        loan.Date_loan,calculation.principlepay,calculation.normal_interest,payment.date_pay,cal.outstanding_days,calculation.penalty_interest,
        cal.pricinplepay+cal.normal_interest+cal.penalty_interest
        FROM payment
        JOIN loan ON loan.loan_id=payment.loan_id
        JOIN principal ON principal.pri_id=payment.pri_id
        JOIN rate ON rate.rate_id=payment.rate_id
        JOIN calculation ON calculation.cal_id=payment.cal_id
        JOIN cal ON cal.id=payment.id`)
        // return this.SelectQuery(1);
        return a;
    }
    // show orderby ID 
    async selectOne(loan_id) {
        const errors = this._validate({ loan_id }, {loan_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('SELECT * FROM payment where loan_id=?', [loan_id]);
        return items.length == 0 ? null : items[0];
    }
    // insert new info
    // async create(value) {
    //     const errors = this._validate(value, this.validate_rules);
    //     if (errors) throw { errors };
    //     // const func_pay = new pay();
    //     // return '666';
    //     return this._database(`SELECT principal.principle,loan.term,payment.date_pay,payment.Amount
    //     FROM payment
    //     JOIN principal ON principal.pri_id=payment.pri_id
    //     JOIN loan ON loan.loan_id=payment.loan_id`)
    //     let func_pay = this.pay(principle, term, date, date_pay, pay);
    //     let rate_pay = func_pay.payment(
    //         value['principle'],
    //         value['term'],
    //         value['date'],
    //         value['date_pay'],
    //         value['pay']
    //     );
    //     const item = await this._database.query('insert into payment value(0, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    //         value['Amount'],
    //         value['Date_pay'],
    //         value['em_id'],
    //         value['cus_id'],
    //         value['cal_id'],
    //         value['id'],
    //         value['loan_id'],
    //         value['pri_id'],
    //         value['rate_id']
    //     ]);
    //     return await this.selectOne(func_pay.insertId);

    // }
//     pay(principle, term, date, date_pay, pay){
//         // calculate principle payment
// //ການຄິດໄລເງີນຕົ້ນທື່ນທັງຫມົດຖຸຶກກູ້ຢື່ມໄປ
// //ຈຳນວນປີ, ເງີນຕົ້ນຈທີ່ຕ້ອງຈ່າຍ, ດອກເບ້ຍ 15%, ຄ່າປັບໄຫມເປັນ 20%
// // const principle=1000000;
// // const term=365;
// const principlepayment = principle/term;
// const defaultInterest = principlepayment * 15/100; //ດອກເບຍຈ່າຍແບບປົກກະຕິ ບໍ່ມີຄ່າປັບໄຫມ
// const penaltyInterest = principlepayment * 20/100; //ດອກເບຍຈ່າຍແບບກ່າຍກຳນົດມີຄ່າປັບໄຫມ
// console.log("- Principle Laon: ", principle);
// console.log("- Term: " + term);
// console.log("- Principle Pay: " + principlepayment);
// console.log("- Base Default Pay with 15%:" + defaultInterest);
// console.log("- Base Default Penalty Pay with 20%: " + penaltyInterest);
// //calculate normal payment
// //ກວດສອບການຈ່າຍປົກກະຕິ
// const normalinterest= principlepayment * 15/100;
// let normalpayment= defaultInterest/term;
// for(i=1;i<=term;i++){ 
//     console.log("- Normal Pay:"+normalpayment);
//     break;
// }
// let penaltyPay = penaltyInterest/term;
// let penalty = penaltyInterest;
// for(i=1; i<=term;i++){
//     if(penaltyPay < penalty){
//         let count = penaltyInterest - defaultInterest;
//         console.log("- Draft Payment Delay:" + count);
//     }else{
//         let count = penaltyPay++;
//         console.log("- Payment Delay Results: " + count);
//     }
//     break;
// }
// //calculate dreaft days
// // const delaypay = principlepayment * 20/100;
// //ກວດສອບເວລາກ່າຍກຳນົດ
// // const deadline = new Date('11/24/2019');
// // const datepay = new Date('11/30/2019');
//     if(datepay>deadline){
//         let diffTime = Math.abs(date - date_pay);
//         var delaypay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//             if(delaypay === 0) {
//                 let count = principlepayment * 15/100;
//                 console.log(count);
//             }else {
//                 let sumday = delaypay++;
//                 let count_total = principlepayment * sumday * 20/100;
//                 console.log("- Delay Day: " + sumday + "\n" + "- Count Total penalty Interest:" + count_total)
//             }
//         }else{
//             let normalpayment = defaultInterest * 15/100;
//             let count = normalpayment - penaltyInterest;
//             console.log(count);
//         }
//         // calculate penalty payment
//         //ກວດສອນການຈາຍແບບປັບໄຫມ່
//         // let pay = 5000;
//         console.log("- User Payment:" + pay);
//         if(delaypay === 0) {
//             let count = pay - defaultInterest;
//             let sum = count + principlepayment;
//             console.log("- Pay with Normal INterest as 15% : " + sum);
//         }else{
//             let count = pay - penalty * delaypay;
//             console.log("- Pay with Penalty Interest as 20% : " + count)
//         }
//     }
    SelectQuery(loan_id) {
        let result = this._database.query('SELECT * FROM cal WHERE loan_id= "'+loan_id+'" AND (remain IS NULL OR remain != 0) ORDER BY id ASC LIMIT 1');
        return result;
    }
    async update(loan_id) {
        let a = this.SelectQuery(loan_id);
        let id = a.id;
        let penalty_interest = a.penalty_interest;
        let outstanding_days = a.outstanding_days;
        let total = a.total;
        let remain = a.remain;
        // let date_pay = new Date();
        // database.update=`
        // UPDATE cal SET 
        // penalty_interest=?,
        // outstanding_days=?,
        // total=?,
        // remain=?,
        // date_pay=?
        // WHERE id=id`
        return a;
    }
    async delete(pay_id) {
        const errors = this._validate({ pay_id }, { pay_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from payment where pay_id=?', [pay_id]);
    }
}
module.exports=Postpay;