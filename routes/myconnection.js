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

async function qManagerByName(name){
    ans = [];
    await new Promise(resolve => {
        sql.query('select  * from manager where name like "%'+name+'%"', async function(err, rows, fields) {
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
    res = {
        success:0,
        role:0,
        ref:0
    }
    qstr = "SELECT * FROM login where account = '"+mana[0]+"' AND password = '"+mana[1]+"' ";
    console.log(qstr);
    await new Promise(resolve => {
        sql.query(qstr, async function(err, rows, fields) {
            if (err){ 
                success = 0;
                throw err;
            }
            console.log(rows.length)
            if(rows.length>0){
                res.role = rows[0].role;
                res.success = 1;
                res.ref = rows[0].ref;
            }
            resolve();
        });
    })
    console.log(res);
    return res;
}

async function qStudentByConditions(con){
    ans = [];
    str = "select  * from student where 1=1 ";
    if(con.name != ''){
        str += "and name like '%" + con.name +"%' "
    }
    if(con.sno != ''){
        str += "and sno like '%" + con.sno +"%' "
    }
    if(con.specialty != ''){
        str += "and specialty like '%" + con.specialty + "%' "
    }
    console.log(str)
    await new Promise(resolve => {
        sql.query(str, async function(err, rows, fields) {
            if (err) throw err;
            ans = rows;
            resolve();
        });
    })
    //sql.end();
    console.log(ans);
    return ans;
}

async function qCourse(condi){
    ans = [];
    str = "select  * from course where teacher_id = "+condi.ref+" " ;
    console.log(str)
    await new Promise(resolve => {
        sql.query(str, async function(err, rows, fields) {
            if (err) throw err;
            ans = rows;
            resolve();
        });
    })
    console.log(ans);
    return ans;
}

async function qCalltheRoll(condi){
    ans = [];
    str = "select  * from calltheroll where courseid in ( select id from course where teacher_id = "+condi.ref+" )" ;
    console.log(str)
    await new Promise(resolve => {
        sql.query(str, async function(err, rows, fields) {
            if (err) throw err;
            ans = rows;
            resolve();
        });
    })
    console.log(ans);
    return ans;
}

async function qCalltheRollStudent(condi){
    ans = [];
    str = "select  * from calltheroll, calltherollstudent, ddstate where calltherollstudent.studentid = "+condi.ref+" and calltheroll.autoid = calltherollstudent.rollid and ddstate.callstate = calltherollstudent.callstate " ;
    console.log(str)
    await new Promise(resolve => {
        sql.query(str, async function(err, rows, fields) {
            if (err) throw err;
            ans = rows;
            resolve();
        });
    })
    console.log(ans);
    return ans;
}

module.exports.qStudent = qStudent;
module.exports.qCalltheRollStudent = qCalltheRollStudent;
module.exports.qCalltheRoll = qCalltheRoll;
module.exports.qCourse = qCourse;
module.exports.qManager = qManager;
module.exports.addManager = addManager;
module.exports.loginManager = loginManager;
module.exports.qManagerByName = qManagerByName;
module.exports.qStudentByConditions = qStudentByConditions;