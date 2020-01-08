const router = require('express').Router();

//#region Posts Component 

const Postsuser = require('../components/user.component');
const Posts = new Postsuser();

const Postscustomer=require('../components/customer.component');
const Postcus=new Postscustomer();


// const Postsamount=require('../components/amount.component');
// const Postam=new Postsamount();



const Postsloan=require('../components/loan.component');
const Postloan=new Postsloan();

const Postslogin=require('../components/login.component');
const Postlogin=new Postslogin();


const Postsout=require('../components/outstanding_days.component');
const Postout=new Postsout();


const Postsprincipal=require('../components/principal.component');
const Postprin=new Postsprincipal();

const Postcal=require('../components/calculation.component');
const Postc=new Postcal();


const Postpay=require('../components/pay.component');
const Postp=new Postpay();


const Postrate=require('../components/rate.component');
const postr=new Postrate();


//////////////////////////////////


router.get('/rate', (req, res) => res.sendAsyncApi(postr.selectAll()));

router.get('/rate/:rate_id', (req, res) => res.sendAsyncApi(postr.selectOne(req.params.rate_id)));

router.post('/rate', (req, res) => res.sendAsyncApi(postr.create(req.body)));

router.put('/rate/:rate_id', (req, res) => res.sendAsyncApi(postr.update(req.params.rate_id, req.body)));

router.delete('/rate/:rate_id', (req, res) => res.sendAsyncApi(postr.delete(req.params.rate_id)));

module.exports = router;


////////////////////////////

router.get('/user', (req, res) => res.sendAsyncApi(Posts.selectAll()));

router.get('/user/:em_id', (req, res) => res.sendAsyncApi(Posts.selectOne(req.params.em_id)));

router.post('/user', (req, res) => res.sendAsyncApi(Posts.create(req.body)));

router.put('/user/:em_id', (req, res) => res.sendAsyncApi(Posts.update(req.params.em_id, req.body)));

router.delete('/user/:em_id', (req, res) => res.sendAsyncApi(Posts.delete(req.params.em_id)));




/////////////////////////////////////

router.get('/customer', (req, res) => res.sendAsyncApi(Postcus.selectAll()));

router.get('/customer/:cus_id', (req, res) => res.sendAsyncApi(Postcus.selectOne(req.params.cus_id)));

router.post('/customer', (req, res) => res.sendAsyncApi(Postcus.create(req.body)));

router.put('/customer/:cus_id', (req, res) => res.sendAsyncApi(Postcus.update(req.params.cus_id, req.body)));

router.delete('/customer/:cus_id', (req, res) => res.sendAsyncApi(Postcus.delete(req.params.cus_id)));

module.exports = router;

///////////////////////////////////////////



// router.get('/amount_payable', (req, res) => res.sendAsyncApi(Postam.selectAll()));

// router.get('/amount_payable/:am_id', (req, res) => res.sendAsyncApi(Postam.selectOne(req.params.am_id)));

// router.post('/amount_payable', (req, res) => res.sendAsyncApi(Postam.create(req.body)));

// router.put('/amount_payable/:am_id', (req, res) => res.sendAsyncApi(Postam.update(req.params.am_id, req.body)));

// router.delete('/amount_payable/:am_id', (req, res) => res.sendAsyncApi(Postam.delete(req.params.am_id)));

// module.exports = router;


///////////////////////////////////////////

router.get('/deffer_revenue', (req, res) => res.sendAsyncApi(Postde.selectAll()));

router.get('/deffer_revenue/:def_id', (req, res) => res.sendAsyncApi(Postde.selectOne(req.params.def_id)));

router.post('/deffer_revenue', (req, res) => res.sendAsyncApi(Postde.create(req.body)));

router.put('/deffer_revenue/:def_id', (req, res) => res.sendAsyncApi(Postde.update(req.params.def_id, req.body)));

router.delete('/deffer_revenue/:def_id', (req, res) => res.sendAsyncApi(Postde.delete(req.params.def_id)));

module.exports = router;



///////////////////////////////////////////

router.get('/loan', (req, res) => res.sendAsyncApi(Postloan.selectAll()));

router.get('/loan/:loan_id', (req, res) => res.sendAsyncApi(Postloan.selectOne(req.params.loan_id)));

router.post('/loan', (req, res) => res.sendAsyncApi(Postloan.create(req.body)));

router.put('/loan/:loan_id', (req, res) => res.sendAsyncApi(Postloan.update(req.params.loan_id, req.body)));

router.delete('/loan/:loan_id', (req, res) => res.sendAsyncApi(Postloan.delete(req.params.loan_id)));

module.exports = router;


///////////////////////////////////////////

router.get('/login', (req, res) => res.sendAsyncApi(Postlogin.selectAll()));

router.get('/login/:login_id', (req, res) => res.sendAsyncApi(Postlogin.selectOne(req.params.login_id)));

router.post('/login', (req, res) => res.sendAsyncApi(Postlogin.create(req.body)));

router.put('/login/:login_id', (req, res) => res.sendAsyncApi(Postlogin.update(req.params.login_id, req.body)));

router.delete('/login/:login_id', (req, res) => res.sendAsyncApi(Postlogin.delete(req.params.login_id)));

module.exports = router;







///////////////////////////////////////////


router.get('/outstanding_days', (req, res) => res.sendAsyncApi(Postout.selectAll()));

router.get('/outstanding_days/:out_id', (req, res) => res.sendAsyncApi(Postout.selectOne(req.params.out_id)));

router.post('/outstanding_days', (req, res) => res.sendAsyncApi(Postout.create(req.body)));

router.put('/outstanding_days/:out_id', (req, res) => res.sendAsyncApi(Postout.update(req.params.out_id, req.body)));

router.delete('/outstanding_days/:out_id', (req, res) => res.sendAsyncApi(Postout.delete(req.params.out_id)));

module.exports = router;





///////////////////////////////////////////

router.get('/principal', (req, res) => res.sendAsyncApi(Postprin.selectAll()));

router.get('/principal/:pri_id', (req, res) => res.sendAsyncApi(Postprin.selectOne(req.params.pri_id)));

router.post('/principal', (req, res) => res.sendAsyncApi(Postprin.create(req.body)));

router.put('/principal/:pri_id', (req, res) => res.sendAsyncApi(Postprin.update(req.params.pri_id, req.body)));

router.delete('/principal/:pri_id', (req, res) => res.sendAsyncApi(Postprin.delete(req.params.pri_id)));

module.exports = router;



///////////////////////////////////////////

router.get('/rate', (req, res) => res.sendAsyncApi(Postrate.selectAll()));

router.get('/rate/:rate_id', (req, res) => res.sendAsyncApi(Postrate.selectOne(req.params.rate_id)));

router.post('/rate', (req, res) => res.sendAsyncApi(Postrate.create(req.body)));

router.put('/rate/:rate_id', (req, res) => res.sendAsyncApi(Postrate.update(req.params.rate_id, req.body)));

router.delete('/rate/:rate_id', (req, res) => res.sendAsyncApi(Postrate.delete(req.params.rate_id)));

module.exports = router;


///////////////////////////////////////////////


router.get('/calculation', (req, res) => res.sendAsyncApi(Postc.selectAll()));

router.get('/calculation/:cal_id', (req, res) => res.sendAsyncApi(Postc.selectOne(req.params.cal_id)));

router.post('/calculation', (req, res) => res.sendAsyncApi(Postc.create(req.body)));

router.put('/calculation/:cal_id', (req, res) => res.sendAsyncApi(Postc.update(req.params.cal_id, req.body)));

router.delete('/calculation/:cal_id', (req, res) => res.sendAsyncApi(Postc.delete(req.params.cal_id)));

module.exports = router;

///////////////////////////////////////////////


router.get('/payment', (req, res) => res.sendAsyncApi(Postp.selectAll()));

router.get('/payment/:pay_id', (req, res) => res.sendAsyncApi(Postp.selectOne(req.params.pay_id)));

router.post('/payment', (req, res) => res.sendAsyncApi(Postp.create(req.body)));

router.put('/payment/:pay_id', (req, res) => res.sendAsyncApi(Postp.update(req.params.pay_id, req.body)));

router.delete('/payment/:pay_id', (req, res) => res.sendAsyncApi(Postp.delete(req.params.pay_id)));

module.exports = router;

/////////////////////////////////////////////









