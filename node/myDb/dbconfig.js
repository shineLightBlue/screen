const mysql = require("mysql"); //引入mysql模块
module.exports = {
  dbConnect: function (sql, callback) {
    // 建立连接
    let connect = mysql.createPool({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "root",
      database: "bigdata",
      multipleStatements: true, //支持执行多条 sql 语句
      timezone: "8:00", //设置时区,如果不匹配，就可能有时差
    });
    // 打开连接
    connect.connect();
    // 通过sql查询数据库
    connect.query(sql, callback);
    // 关闭连接
    connect.end();
  },
};
