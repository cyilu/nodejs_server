var express = require('express');
var sql= require('./myconnection');
var router = express.Router();
var sd = require('silly-datetime');


router.get('/user', async function(req, res, next) {
  ans = [];
  condi = {
     account:req.param('account')//,
     //role:req.param('role')
   } 
  console.log(condi);
  await sql.qUser(condi).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.post('/user', async function(req, res, next) {
  ans = {};
  user = {
    account:req.param('account'),
    email:req.param('email'),
    password:req.param('password'),
    role:req.param('role'),
    name:req.param('name'),
    school:req.param('school')
  } 
  console.log(user);
  await sql.addUser(user).then(v => {
    ans = v;
  });
  res.json({data: ans['ans'], info:ans, message: 200});
});

router.put('/user/:id', async function(req, res, next) {
  ans = 0;
  user = {
    id:req.param('id'),
    account:req.param('account'),
    email:req.param('email'),
    name:req.param('name'),
    school:req.param('school')
    //password:req.param('password')//,
    //role:req.param('role')
  } 
  console.log(user);
  await sql.updateUser(user).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.delete('/user/:id', async function(req, res, next) {
  ans = 0;
  id=req.param('id'),

  console.log(id);
  await sql.deleteUser(id).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.get('/dic', async function(req, res, next) {
  ans = [];
  // condi = {
  //    account:req.param('account')//,
  //    //role:req.param('role')
  //  } 
  // console.log(condi);
  await sql.qDic().then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.post('/dic', async function(req, res, next) {
  ans = 0;
  dic = {
    code:req.param('code'),
    name:req.param('name'),
    value:req.param('value'),
    class:req.param('class'),
    description:req.param('description')
  } 
  console.log(dic);
  await sql.addDic(dic).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.delete('/dic/:id', async function(req, res, next) {
  ans = 0;
  id=req.param('id'),

  console.log(id);
  await sql.deleteDic(id).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*
router.get('/testing', async function(req, res, next) {
  ans = [];w
  await sql.qStudent().then(v => {
    ans = v;
  });
  res.json({data: ans, message: 1});
});*/

router.get('/manager', async function(req, res, next) {
  ans = [];
  await sql.qManager().then(v => {
    ans = v;
  });
  res.json({data: ans, message: 1});
});
/*
router.post('/managerInfoByName', async function(req, res, next) {
  ans = [];
  name = req.param('name') 
  await sql.qManagerByName(name).then(v => {
    ans = v;
  });
  res.json({data: ans, message: '成功'});
});*/

router.post('/manager', async function(req, res, next) {
  re = 0;
  mana=[];
  mana.push(req.param('account') );
  mana.push(req.param('name') );
  mana.push(0);
  var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  console.log(time);
  mana.push(time);
  //mana.push(req.param('password') );
  console.log(mana);
  await sql.addManager([mana]).then(v => {
    re = v;
  });
  res.json({data: [], message: re});
});

router.get('/login', async function(req, res, next) {
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

router.get('/student', async function(req, res, next) {
  ans = [];
  await sql.qStudent().then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});
/*
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
});*/

router.get('/course', async function(req, res, next) {
  ans = [];
  condi = {
    ref:req.param('ref'),
    name:req.param('name')
  } 
  console.log(condi);
  await sql.qCourse(condi).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.get('/teachercourse/:id', async function(req, res, next) {
  ans = [];
  condi = {
    ref:req.param('id'),
    name:""
  } 
  console.log(condi);
  await sql.qCourse2(condi).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.post('/course', async function(req, res, next) {
  ans = 0;
  condi=[];
  condi.push(req.param('name'));
  condi.push(req.param('ref'));
  condi.push(req.param('class'));
  condi.push(req.param('time'));
  condi.push(req.param('week'));
  condi.push(req.param('number'));
  condi.push(req.param('courseid'))
  console.log(condi);
  await sql.addCourse([condi]).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.get('/calltheRoll', async function(req, res, next) {
  ans = [];
  condi = {
    ref:req.param('ref'),
    name:req.param('name')
  } 
  console.log(condi);
  await sql.qCalltheRoll(condi).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.get('/rolldetail', async function(req, res, next) {
  ans = [];
  condi = {
    ref:req.param('ref'),
    id:req.param('id')
  } 
  console.log(condi);
  await sql.qCalltheRollDetail(condi).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.get('/calltheRollStudent', async function(req, res, next) {
  ans = [];
  condi = {
    ref:req.param('ref'),
    name:req.param('name')
  } 
  console.log(condi);
  await sql.qCalltheRollStudent(condi).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.get('/studentcourse/:id', async function(req, res, next) {
  ans = [];
  id = req.param('id')
  await sql.qStudentCourse(id).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.get('/course/:id', async function(req, res, next) {
  ans = [];
  id = req.param('id')
  await sql.qCourseID(id).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.post('/roll', async function(req, res, next) {
  ans = 0;
  roll=[];
  roll.push(req.param('id'));
  roll.push(req.param('time'));
  roll.push(req.param('position'));
  roll.push(req.param('state'));
  console.log(roll);
  await sql.addRoll(roll).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

router.post('/sc', async function(req, res, next) {
  ans = [];
  sc=[];
  sc.push(req.param('cid'));
  sc.push(req.param('sid'));
  console.log(sc);
  await sql.addSC(sc).then(v => {
    ans = v;
  });
  res.json({data: ans, message: 200});
});

module.exports = router;
