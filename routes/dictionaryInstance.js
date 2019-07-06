const {Onela, OnelaBaseModel} = require("onela");
class dicInstance extends OnelaBaseModel {
    // 可以在此自定义扩展方法（默认封装没有的方法）
}
dicInstance.configs = {
    fields: [
        {"name": "id", "type": "int", "default": null, "increment": true}, 
        {"name": "code", "type": "varchar"},
        {"name": "name", "type": "varchar"},
        {"name": "value", "type": "varchar"},
        {"name": "class", "type": "varchar"},
        {"name": "description", "type": "varchar"},
        {"name": "isdelete", "type": "int"}
    ],
    "tableName": "dictionary",     // 映射数据表名
    "engine": "default"           // 数据库实例引擎，匹配dbconfig中的配置
};

module.exports.dicInstance = dicInstance;