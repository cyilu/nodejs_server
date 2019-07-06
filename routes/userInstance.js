const {Onela, OnelaBaseModel} = require("onela");
class userInstance extends OnelaBaseModel {
    // 可以在此自定义扩展方法（默认封装没有的方法）
}
userInstance.configs = {
    fields: [
        {"name": "id", "type": "int", "default": null, "increment": true}, 
        {"name": "account", "type": "varchar"},
        {"name": "email", "type": "varchar"},
        {"name": "password", "type": "varchar"},
        {"name": "role", "type": "int"},
        {"name": "ref", "type": "int"},
        {"name": "school", "type": "varchar"},
        {"name": "name", "type": "varchar"},
        {"name": "isDeleted", "type": "int"}
    ],
    "tableName": "login",     // 映射数据表名
    "engine": "default"           // 数据库实例引擎，匹配dbconfig中的配置
};

module.exports.userInstance = userInstance;