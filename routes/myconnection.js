//mysql.js
var mysql = require('mysql'); //调用MySQL模块
//创建一个connection
var sql = mysql.createConnection({
    host: '127.0.0.1', //主机
    user: 'root',     //数据库用户名
    password: '',     //数据库密码
    port: '3306',       
    database: 'attendance', //数据库名称
    charset: 'UTF8_GENERAL_CI' //数据库编码
});
sql.connect();
async function qStudent(){
    ans = [];
    await new Promise(resolve => {
        sql.query('select  * from student', async function(err, rows, fields) {
            if (err) throw err;
            ans = rows;
            resolve();
        });
    })
    //sql.end();
    console.log(ans);
    return ans;
}

async function qManager(){
    ans = [];
    await new Promise(resolve => {
        sql.query('select  * from manager', async function(err, rows, fields) {
            if (err) throw err;
            ans = rows;
            resolve();
        });
    })
    console.log(ans);
    return ans;
}

async function addManager(mana){
    success = 0;
    await new Promise(resolve => {
        sql.query("INSERT INTO login(`account`,`email`,`password`) VALUES ?", [mana], async function(err, rows, fields) {
            if (err){ 
                success = 0;
                throw err;
            }
            success = 1;
            resolve();
        });
    })
    console.log(success);
    return success;
}

async function loginManager(mana){
    success = 0;
    qstr = "SELECT * FROM login where account = '"+mana[0]+"' AND password = '"+mana[1]+"' ";
    console.log(qstr);
    await new Promise(resolve => {
        sql.query(qstr, async function(err, rows, fields) {
            if (err){ 
                success = 0;
                throw err;
            }
            console.log(rows.length)
            if(rows.length>0)
                success = 1;
            resolve();
        });
    })
    console.log(success);
    return success;
}

module.exports.qStudent = qStudent;
module.exports.qManager = qManager;
module.exports.addManager = addManager;
module.exports.loginManager = loginManager;