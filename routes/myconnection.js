//mysql.js
var mysql = require('mysql'); //调用MySQL模块
const {Onela, OnelaBaseModel} = require("onela");
var userInstance = require('./userInstance').userInstance;
var dicInstance = require('./dictionaryInstance').dicInstance;
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

let dbconfig = [{
    "engine": "default",    // 数据库实例名称
    "type": "mysql",        // 数据库类型：MYSQL（不区分大小写）,支持类型：m
    // ysql、postgresql、sqlite、sqlserver
    "value": {
        "connectionLimit": 5,
        "port": 3306,
        "host": "localhost",
        "user": "root",
        "password": "",
        "database": "attendance"
    }
}];
Onela.init(dbconfig);

async function qUser(condi){
    ans = [];
    if(condi.account == "")
        p = {
            "select": ["*"],
            "where": [
                {"logic": "and", "key": 'isDeleted', "operator": "=", "value": 0}//,
                //{"logic": "and", "key": 'role', "operator": "=", "value": condi.role}
            ]
        }
    else {
        p = {
            "select": ["*"],
            "where": [
                {"logic": "and", "key": 'isDeleted', "operator": "=", "value": 0},
                {"logic": "and", "key": 'account', "operator": "=", "value": condi.account}//,
                //{"logic": "and", "key": 'role', "operator": "=", "value": condi.role}
            ]
        }
    }
    await new Promise(resolve => {
        userInstance.getEntity(p).then((data) => {
            ans = data;
            resolve();
        }).catch((err) => {
            return Promise.reject(err);
        });
    })
    console.log(p)
    //sql.end();
    //console.log(ans);
    return ans;
}

async function addUser(user){
    ans = 0;
    d = {};
    let entity = {
        account:user.account,
        email:user.email,
        password:user.password,
        role:user.role,
        name:user.name,
        school:user.school,
        ref:1,
        isDeleted:0
    }
    await new Promise(resolve => {
        userInstance.insertEntity(entity).then((data) => {
            //console.log('查询结果', data)
            ans = 1;  
            //ans = data;
            resolve();
        }).catch((err) => {
            return Promise.reject(err);
        });
    })
    p = {
        "select": ["*"],
        "where": [
            {"logic": "and", "key": "account","operator": "=", "value": user.account},
            {"logic": "and", "key": 'email', "operator": "=", "value": user.email}
        ]
    }
    await new Promise(resolve => {
        userInstance.getEntity(p).then((data) => {
            d = data[0];
            resolve();
        }).catch((err) => {
            return Promise.reject(err);
        });
    })
    d['ans'] = ans;
    console.log(d);
    return d;
}

async function updateUser(user){
    ans = 0;
    let p = {
        "update": [
            { "key": "account", "value": user.account, "operator": "replace"},
            { "key": "email", "value": user.email, "operator": "replace"},
            { "key": "name", "value": user.name, "operator": "replace"},
            { "key": "school", "value": user.school, "operator": "replace"}//,
            //{ "key": "password", "value": user.password, "operator": "replace"},
            //{ "key": "role", "value": user.role, "operator": "replace"}
        ],
        "where": [
            { "logic": "and","key": "id", "operator": "=", "value":user.id} 
        ]
    }
    await new Promise(resolve => {
        userInstance.updateEntity(p).then((data) => {
            console.log('查询结果', data)
            ans = 1;  
            //ans = data;
            resolve();
        }).catch((err) => {
            return Promise.reject(err);
        });
    })
    //sql.end();
    console.log(ans);
    return ans;
}



async function deleteUser(id){
    ans = 0;
    let p = {
        "update": [
            { "key": "isDeleted", "value": 1, "operator": "replace"}
        ],
        "where": [
            { "logic": "and","key": "id", "operator": "=", "value":id} 
        ]
    }
    await new Promise(resolve => {
        userInstance.updateEntity(p).then((data) => {
            console.log('查询结果', data)
            ans = 1;  
            //ans = data;
            resolve();
        }).catch((err) => {
            return Promise.reject(err);
        });
    })
    //sql.end();
    console.log(ans);
    return ans;
}

async function addDic(dic){
    ans = 0;
    let entity = {
        code:dic.code,
        name:dic.name,
        value:dic.value,
        class:dic.class,
        description:dic.description,
        //school:dic.code,
        //ref:1,
        isdelete:0
    }
    await new Promise(resolve => {
        dicInstance.insertEntity(entity).then((data) => {
            console.log('查询结果', data)
            ans = 1;  
            //ans = data;
            resolve();
        }).catch((err) => {
            return Promise.reject(err);
        });
    })
    //sql.end();
    console.log(ans);
    return ans;
}

async function qDic(){
    ans = [];
    //if(condi.account == "")
        p = {
            "select": ["*"],
            "where": [
                {"logic": "and", "key": 'isdelete', "operator": "=", "value": 0}//,
                //{"logic": "and", "key": 'role', "operator": "=", "value": condi.role}
            ]
        }
    /*else {
        p = {
            "select": ["*"],
            "where": [
                {"logic": "and", "key": 'isDeleted', "operator": "=", "value": 0},
                {"logic": "and", "key": 'account', "operator": "=", "value": condi.account}//,
                //{"logic": "and", "key": 'role', "operator": "=", "value": condi.role}
            ]
        }
    }*/
    await new Promise(resolve => {
        dicInstance.getEntity(p).then((data) => {
            ans = data;
            resolve();
        }).catch((err) => {
            return Promise.reject(err);
        });
    })
    console.log(p)
    //sql.end();
    //console.log(ans);
    return ans;
}

async function deleteDic(id){
    ans = 0;
    let p = {
        "update": [
            { "key": "isdelete", "value": 1, "operator": "replace"}
        ],
        "where": [
            { "logic": "and","key": "id", "operator": "=", "value":id} 
        ]
    }
    await new Promise(resolve => {
        dicInstance.updateEntity(p).then((data) => {
            console.log('查询结果', data)
            ans = 1;  
            //ans = data;
            resolve();
        }).catch((err) => {
            return Promise.reject(err);
        });
    })
    //sql.end();
    console.log(ans);
    return ans;
}

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
        sql.query("INSERT INTO manager(`account`,`name`,`state`,`creatingTime`) VALUES ?", [mana], async function(err, rows, fields) {
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
        ref:0,
        info:{}
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
                res.info = rows[0];
                res.role = rows[0].role;
                res.success = 1;
                res.ref = rows[0].ref;
            }
            resolve();
        });
    });
    if(res.success == 0){
        qstr = "SELECT * FROM login where email = '"+mana[0]+"' AND password = '"+mana[1]+"' ";
        await new Promise(resolve => {
            sql.query(qstr, async function(err, rows, fields) {
                if (err){ 
                    success = 0;
                    throw err;
                }
                console.log(rows.length)
                if(rows.length>0){
                    res.info = rows[0];
                    res.role = rows[0].role;
                    res.success = 1;
                    res.ref = rows[0].ref;
                }
                resolve();
            });
        }); 
    }

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
    if(condi.name!=""){
        str+=" and course.course_name like '%"+condi.name+"%' "
    }
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

async function qCourse2(condi){
    ans = [];
    str = "select  * from course,login where teacher_id = "+condi.ref+" and login.role = 3 and login.ref = "+condi.ref ;
    // if(condi.name!=""){
    //     str+=" and course.course_name like '%"+condi.name+"%' "
    // }
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

async function qCourseID(id){
    ans = [];
    str = "select  * from course where id = "+id+" " ;
    console.log(str)
    await new Promise(resolve => {
        sql.query(str, async function(err, rows, fields) {
            if (err) throw err;
            ans = rows[0];
            resolve();
        });
    })
    console.log(ans);
    return ans;
}

async function addCourse(condi){
    success = 0;
    await new Promise(resolve => {
        sql.query("INSERT INTO course(`course_name`,`teacher_id`,`class`,`time`,`week`,`number`,`courseid`) VALUES ?", [condi], async function(err, rows, fields) {
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

async function qCalltheRoll(condi){
    ans = [];
    str = "select  * from calltheroll where courseid in ( select id from course where teacher_id = "+condi.ref+" )" ;
    if(condi.name != ""){
        str += " and calltheroll.coursename like '%"+condi.name+"%' ";
    }
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
    if(condi.name != ""){
        str += " and calltheroll.coursename like '%"+condi.name +"%' ";
    }
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

async function qCalltheRollDetail(condi){
    ans = [];
    str = "select  * from calltheroll, calltherollstudent, ddstate,login where calltheroll.autoid = calltherollstudent.rollid and ddstate.callstate = calltherollstudent.callstate and calltherollstudent.studentid = login.ref and login.role=2 " ;
    str += " and calltheroll.autoid = "+condi.id;
    console.log(str)
    // if(condi.name != ""){
    //     str += " and calltheroll.coursename like '%"+condi.name +"%' ";
    // }
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

async function qStudentCourse(id){
    ans = [];
    str = "select  * from sc, course, login where sc.student_id = "+id+" and course.id = sc.course_id and login.role = 3 and course.teacher_id = login.ref ";
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

async function addRoll(roll){
    success = 0;
    name='';
    str = "select  * from course where id = "+roll[0]+" ";
    await new Promise(resolve => {
        sql.query(str, async function(err, rows, fields) {
            if (err) throw err;
            name = rows[0].course_name;
            resolve();
        });
    })
    console.log(name);
    roll.push(name);

    await new Promise(resolve => {
        sql.query("INSERT INTO calltheroll(`courseid`,`calldate`,`callposition`,`callstate`,`coursename`) VALUES ?", [[roll]], async function(err, rows, fields) {
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

async function addSC(sc){
    success = 0;
    ans=[];
    str = "select  * from course where id = "+sc[0]+" ";
    await new Promise(resolve => {
        sql.query(str, async function(err, rows, fields) {
            if (err) throw err;
            ans = rows[0];
            resolve();
        });
    })
    console.log(ans);
    //roll.push();

    await new Promise(resolve => {
        sql.query("INSERT INTO sc(`course_id`,`student_id`) VALUES ?", [[sc]], async function(err, rows, fields) {
            if (err){ 
                success = 0;
                throw err;
            }
            success = 1;
            resolve();
        });
    })
    console.log(success);
    return ans;
}

module.exports.qUser = qUser;
module.exports.qDic = qDic;
module.exports.addUser = addUser;
module.exports.addDic = addDic;
module.exports.addRoll = addRoll;
module.exports.addSC = addSC;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.qStudent = qStudent;
module.exports.qCalltheRollStudent = qCalltheRollStudent;
module.exports.qCalltheRoll = qCalltheRoll;
module.exports.qCourse = qCourse;
module.exports.qCourse2 = qCourse2;
module.exports.qCourseID = qCourseID;
module.exports.qManager = qManager;
module.exports.addManager = addManager;
module.exports.loginManager = loginManager;
module.exports.qManagerByName = qManagerByName;
module.exports.qStudentByConditions = qStudentByConditions;
module.exports.addCourse = addCourse;
module.exports.qCalltheRollDetail = qCalltheRollDetail;
module.exports.qStudentCourse = qStudentCourse;
module.exports.deleteDic = deleteDic;