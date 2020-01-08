var express= require('express');
class Functions {
payment(principle,term){
    // calculate principle payment
const principle=12000000;
const day=365;
const year = 1;
const term=year*day;
let principlepayment=principle/term;
for(i=1;i<=term;i++){
    console.log("Prinpay:"+principlepayment);
    break;
}
//calculate normal payment
const normalinterest=15/100;
let normalpayment=principle*normalinterest/term;
for(i=1;i<=term;i++){ 
    console.log("Norpay:"+normalpayment);
    break;
}
//calculate dreaft days
const deadline = new Date('11/28/2019');
const datepay = new Date('11/30/2019');
if(datepay>deadline){
    let diffTime = Math.abs(deadline - datepay);
    var outstanding = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log("Draftdays:"+outstanding);
}else{
    console.log('Nothing');
}
// calculate penalty payment
const penaltyinterest=12/100;
let pen=((principle*penaltyinterest/term)*outstanding)+((normalpayment*penaltyinterest/term)*outstanding);
for(i=1;i<=term;i++){
    console.log("Penalpay:"+pen);
    break;
}
//total payment
var sum = principlepayment+normalpayment+pen;
console.log("Total:"+sum);
// case payment step by step
let payment=10000
console.log("Pen: "+pen);
console.log("Pay: "+payment);
if(pen>0){
    var penpay=payment-pen;
    for(i=1;i<=term;i++){
        console.log("Pen Pay: "+penpay);  
        break;
    }
    if(penpay > 0 ){
        var penn=pen+penpay;
        console.log(penn);
    }
    pen=0;
    payment = penpay;
}
console.log("NP: "+normalpayment);
console.log("Pay: "+payment);
 if(pen<=0){
    var norpay=payment-normalpayment;
    for(i=1;i<=term;i++){
        console.log("Normal Pay: "+norpay);
        break;
    }
    if(norpay>0){
        var principay=norpay-principlepayment;
        console.log("Prinsum:"+principay);
    }
    normalpayment = 0;
    payment = norpay;
} 
if(normalpayment<=0){
    var prinpay=payment-principlepayment;
    for(i=1;i<=term;i++){
        console.log("Principle Pay: "+prinpay);
        break;
    }
    if(prinpay > 0 ){
        var Total=principle-prinpay;
        console.log(Total);
    }
    principlepayment=0
    payment=Total;
}
var draft=pen+normalpayment;
console.log(draft);
}
}
//TO DO:
// - ຖ້າຈ່າຍເກິນແລ້ວຫັກຄ່າເພື່ອມາເກັບໄວ້ລົບຄັ່ງຕໍ່ໄປ
// - ຖ້າຈ່າຍບໍ່ພໍຕ້ອງເກັບຄ່າໄວຫັກຄັ່ງຕໍ່ໄປ
module.exports=Functions;