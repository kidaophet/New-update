var express= require('express'); 
class Functions {
    calculate(principle,normal_rate,penalty_rate,term,outstanding_days){
        let normalcal = this.normal_interest(principle,normal_rate,term)
            // var normal = '{"normalcal":'+normalcal+'}'
            // var cal = JSON.parse(calcu)
            // let normalcal = '555';
        let penaltycal = this.penalty_interest(principle,penalty_rate,normal_rate,term,outstanding_days);
            // var penalty = '{"penaltycal":'+penaltycal+'}';
            // var pen = JSON.parse(pena);
            // "penaltycal":'+penaltycal+',
            // let principlecal = '6666';
        let principlecal = this.principal(principle,term);        
            // var princ = '{"principlecal":'+principlecal+'}';
            // var prin = JSON.parse(princ);
        let totalcal=this.totalpay(principlecal,normalcal,penaltycal);
        let result =  '{"normalcal":'+normalcal+',"penaltycal":'+penaltycal+',  "principlecal":'+principlecal+', "totalcal":'+totalcal+'}';
        let result_json = JSON.parse(result);
         return result_json;   
    }
    outstand(date,date_pay){
        let outstandingcal = this.outstanding_days(date, date_pay);
        let out='{"outstandingcal":'+outstandingcal+'}';
        let outstanding=JSON.parse(out);
        return outstanding;
    }


    repayment(principlepay,normal_interest,penalty_interest,term,amount){
        let repaycal=this.payment(principlepay,normal_interest,penalty_interest,term,amount);
        let repaymentcal='{"repaycal":'+repaycal+'}';
        let pay=JSON.parse(repaymentcal);
        return pay;
    }






    // normal_interest
    normal_interest(principle,normal_rate,term) {
        // var pi = principle;
        // const n=normal_rate;
        // var term=term;
        const nor= parseFloat(principle)*parseFloat(normal_rate/100)/parseInt(term)
        // for(i=1;i<term;i++){    
            // var txt = '{"nor":'+nor+'}';
            // var obj = JSON.parse(txt);
            return nor;
        // }
    }
    penalty_interest(principle,penalty_rate,normal_rate,term,outstanding_days) {   
        // var pi = principle;
        // const p=penalty_rate;
        // var term=term;
        // var o=outstanding_days;
        let nor = this.normal_interest(principle,normal_rate,term);
        const pen=((principle*penalty_rate/term)*outstanding_days)+((nor*penalty_rate/term)*outstanding_days);
        // for(i=1;i<term;i++){
        // var txt = '{"pen":'+pen+'}';
        // var obj = JSON.parse(txt);
        return pen; 
        // }
    }
    principal(principle,term) {
        // var a = principle;
        const pp= parseFloat(principle)/parseInt(term);
        // for(i=1;i<=term;i++){
        //     var txt = '{"pp":'+pp+'}';
        //     var obj = JSON.parse(txt);
            return pp;
        // }
    }

    outstanding_days(date, date_pay) {
        let days=1000*60*60*24;      
        let diffTime = Math.abs(Date.parse(date_pay)- Date.parse(date));
        var od = Math.ceil(diffTime / days);     
        // var txt = '{"od":'+od+'}';
        // var obj = JSON.parse(txt);
        return od;
    }


    totalpay(principal,normal_interest,penalty_interest){
        // let pp=this.principal(principal,term)
        // let nor = this.normal_interest(principal,normal_interest,term);
        // let pen = this.penalty_interest(principal,penalty_interest,normal_interest,term,outstanding_days);
        const total=parseFloat(principal)+parseFloat(normal_interest)+parseFloat(penalty_interest);
        // var txt = '{"total":'+total+'}';
        // var obj = JSON.parse(txt);
        return total;
    }
   
    payment(principlepay,normal_interest,penalty_interest,term,amount){
//         this.
//         const amount= 10000;
// const pp=10000;
// const nor=250;
// const pen=300;
// const term=2;
// const sum=parseFloat(pp+nor+pen);


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
return ;
    }
} 
module.exports=Functions;







 
        





                          








                

                        
    
                   
