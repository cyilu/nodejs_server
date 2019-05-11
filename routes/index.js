var express = require('express');
var sql= require('./myconnection');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testing', async function(req, res, next) {
  ans = [];
  await sql.qStudent().then(v => {
    ans = v;
  });
  res.json({data: ans, message: 1});
});

router.post('/managerInfo', async function(req, res, next) {
  ans = [];
  await sql.qManager().then(v => {
    ans = v;
  });
  res.json({data: ans, message: 1});
});

router.post('/managerInfoByName', async function(req, res, next) {
  ans = [];
  name = req.param('name') 
  await sql.qManagerByName(name).then(v => {
    ans = v;
  });
  res.json({data: ans, message: '成功'});
});

router.post('/addManager', async function(req, res, next) {
  re = 0;
  mana=[];
  mana.push(req.param('account') );
  mana.push(req.param('email') );
  mana.push(req.param('password') );
  console.log(mana);
  await sql.addManager([mana]).then(v => {
    re = v;
  });
  res.json({data: [], message: re});
});

router.post('/loginManager', async function(req, res, next) {
  re = '';
  mana=[];
  mana.push(req.param('account') );
  mana.push(req.param('password') );
  console.log(mana);
  await sql.loginManager(mana).then(v => {
    re = v;
  });
  res.json({data: re, message: re.success});
});

router.post('/qStudent', async function(req, res, next) {
  ans = [];
  await sql.qStudent().then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.post('/qStudentByConditions', async function(req, res, next) {
  ans = [];
  con = {
    name:req.param('name'),
    sno:req.param('sno'), 
    specialty:req.param('specialty')
  } 
  console.log(con);
  await sql.qStudentByConditions(con).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.post('/qCourse', async function(req, res, next) {
  ans = [];
  condi = {
    ref:req.param('ref')
  } 
  console.log(condi);
  await sql.qCourse(condi).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.post('/qCalltheRoll', async function(req, res, next) {
  ans = [];
  condi = {
    ref:req.param('ref')
  } 
  console.log(condi);
  await sql.qCalltheRoll(condi).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.post('/qCalltheRollStudent', async function(req, res, next) {
  ans = [];
  condi = {
    ref:req.param('ref')
  } 
  console.log(condi);
  await sql.qCalltheRollStudent(condi).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

module.exports = router;
