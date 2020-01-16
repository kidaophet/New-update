
class Functions {
    payment2(){
        
        





    }}
//        // calculate principle payment
// //ການຄິດໄລເງີນຕົ້ນທື່ນທັງຫມົດຖຸຶກກູ້ຢື່ມໄປ
// //ຈຳນວນປີ, ເງີນຕົ້ນຈທີ່ຕ້ອງຈ່າຍ, ດອກເບ້ຍ 15%, ຄ່າປັບໄຫມເປັນ 20%
// // const principle=1000000;
// // const term=365;
// // const principlepayment = principle/term;
// // const defaultInterest = principlepayment * 15/100; //ດອກເບຍຈ່າຍແບບປົກກະຕິ ບໍ່ມີຄ່າປັບໄຫມ
// // const penaltyInterest = principlepayment * 20/100; //ດອກເບຍຈ່າຍແບບກ່າຍກຳນົດມີຄ່າປັບໄຫມ
// // console.log("- Principle Laon: ", principle);
// // console.log("- Term: " + term);
// // console.log("- Principle Pay: " + principlepayment);
// // console.log("- Base Default Pay with 15%:" + defaultInterest);
// // console.log("- Base Default Penalty Pay with 20%: " + penaltyInterest);
// //calculate normal payment
// //ກວດສອບການຈ່າຍປົກກະຕິ
// principle=120000;
// term=2;
// normal_rate=10;
// penalty_rate=15;
// outstanding_days=2;

// const pp=principle/term;
// const nor= principle * normal_rate/100/term;
// const pen=((principle*penalty_rate/term)*outstanding_days)+((nor*penalty_rate/term)*outstanding_days);
// const sum=pp+nor+pen;
// let amount=20000;

// console.log(pp);
// console.log(nor);
// console.log(pen);
// console.log(sum);
// console.log(amount);


// for(i=1; i<=term;i++){
//     if(amount < sum){
//         let penpay = amount-pen;
//         if(penpay>0){
//             let penpay1=penpay-nor;
//         }else{
//             let penpay1=penpay++;
//         }
//         // console.log("- Draft Payment Delay:" + count);
//     }else{
//         let penpay = penaltyPay++;
//         // console.log("- Payment Delay Results: " + count);
//     }
//     console.log(penpay);
//     console.log(penpay1);
// }
// //calculate dreaft days
// // const delaypay = principlepayment * 20/100;
// //ກວດສອບເວລາກ່າຍກຳນົດ
// const date = new Date('11/24/2019');
// const date_pay = new Date('11/30/2019');
//     if(datepay>deadline){
//         let diffTime = Math.abs( date_pay-date);
//         var delaypay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//             if(delaypay === 0) {
//                 let count = principlepayment * 15/100;
//                 // console.log(count);
//             }else {
//                 let sumday = delaypay++;
//                 let count_total = principlepayment * sumday * 20/100;
//                 // console.log("- Delay Day: " + sumday + "\n" + "- Count Total penalty Interest:" + count_total)
//             }
//         }else{
//     let normalpayment = defaultInterest * 15/100;
//     let count = normalpayment - penaltyInterest;
//     // console.log(count);
// }
// // calculate penalty payment
// //ກວດສອນການຈາຍແບບປັບໄຫມ່
// let pay = 5000;
// // console.log("- User Payment:" + pay);
// if(delaypay === 0) {
//     let count = pay - defaultInterest;
//     let sum = count + principlepayment;
//     // console.log("- Pay with Normal INterest as 15% : " + sum);
// }else{
//     let count = pay - penalty * delaypay;
//     // console.log("- Pay with Penalty Interest as 20% : " + count)
// }
//     }
// }
