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
  re = 0;
  mana=[];
  mana.push(req.param('account') );
  mana.push(req.param('password') );
  console.log(mana);
  await sql.loginManager(mana).then(v => {
    re = v;
  });
  res.json({data: [], message: re});
});

module.exports = router;
