// 1,导入mysql依赖
const mysql = require("mysql");
// 2.获取mysql连接对象Connection
const connection = mysql.createConnection({
  // 主机名
  host: "127.0.0.1",
  // user:用户名
  user: "root",
  // password:用户密码
  password: "root",
  // port:mysql端口号
  port: 3306,
  // 获取哪一个数据：数据库名
  database: "bigdata",
});
// 3.建立连接
connection.connect();
// 4.执行mysql操作：查询操作
connection.query("select * from user", function (error, results, fields) {
  //控制台打印结果
  console.log(results);
  console.log(results[0]);
  results = results.map((v) => Object.assign({}, v));
  console.log(results);
  console.log(results[0]["username"]);
});
// const insert = "insert into user(username,pwd,address) values(?,?,?)";
// connection.query(
//   insert,
//   ["smith", "123456", "山西省太原市小店区"],
//   (err, result) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log(result);
//       console.log("数据插入成功");
//     }
//   }
// );
// 5.关闭数据连接
connection.end();
