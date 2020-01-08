var express= require('express'); 
class Functions {
    // normal_interest
    normal_interest(principle,normal_rate,term) {
        var pi = principle;
        const n=normal_rate;
        var term=term;
        const nor= parseFloat(pi)*parseFloat(n/100)/parseInt(term)
        for(i=1;i<term;i++){    
            var txt = '{"nor":'+nor+'}';
            var obj = JSON.parse(txt);
            return obj;
        }
    }
    penalty_interest(principle,penalty_rate,term,outstanding_days) {   
        var pi = principle;
        const p=penalty_rate;
        var term=term;
        var o=outstanding_days;
        const pen=((pi*p/term)*o)+((nor*p/term)*o);
        for(i=1;i<term;i++){
        var txt = '{"pen":'+pen+'}';
        var obj = JSON.parse(txt);
        return obj;
        }
    }
    principal(principle,term) {
        var a = principle;
        const pp= parseFloat(a)/parseInt(term);
        for(i=1;i<=term;i++){
            var txt = '{"pp":'+pp+'}';
            var obj = JSON.parse(txt);
            return obj;
        }
    }
    outstanding_days(loan_date, deadline) {
        var datepay= new Date(),
        deadline= new Date(),
        days=1000*60*60*24;
        diff=loan_date-deadline;       
        var od=outstanding_days;
        let diffTime = Math.abs(deadline - datepay);
        var od = Math.ceil(diffTime / days); 
        var txt = '{"od":'+od+'}';
        var obj = JSON.parse(txt);
        return obj;
    }
}
module.exports=Functions;







 
        





                          








                

                        
    
                   
