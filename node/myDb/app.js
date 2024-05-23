//导入express
const express = require("express");
const path = require("path");
// const db = require("./dbconfig");
const mysql = require("mysql"); //引入mysql模块
const jwt = require("jsonwebtoken");
const multer = require("multer");
var expressJWT = require("express-jwt");
const cors = require("cors");
var bodyParser = require("body-parser");
//创建服务器对象
const app = express();
app.use(express.static("public"));
//配置解析表单数据的中间件 app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); //解析json
//4.2步骤
// 1.导入jsonwebtoken生成 jwt 字符串的包
// 2.导入将客户端发送过来的 JWT 字符串，解析还原成 JSON 对象的包
// const expressJWT = require("express-jwt");
app.use(cors());
const storage = multer.diskStorage({
  //存储的位置
  destination(req, file, cb) {
    console.log(file);
    cb(null, "upload/");
  },
  //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
  filename(req, file, cb) {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});

// var upload = multer({
//   dest: "upload/",
// });
const upload = multer({ storage });
//4.3步骤
const secretKey = "aflowerdemon is No1 ^_^"; //密钥里边的字符可以自定义
let db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "server",
  multipleStatements: true, //支持执行多条 sql 语句
  timezone: "8:00", //设置时区,如果不匹配，就可能有时差
});
//4.4步骤
app.use(
  expressJWT({ secret: secretKey }).unless({
    path: ["/login"],
  })
);

//4.5步骤
app.post("/login", (req, res) => {
  console.log(req.body);
  // 登录失败
  if (req.body.username !== "admin" && req.body.password !== "123321") {
    return res.send({
      status: "400",
      message: "登录失败",
    });
  }
  // 登录成功
  // 先制作jwt字符串 记住千万不要把密码加密到 token 字符串中，这样容易被人破解密码
  // 格式：jwt.sign({用户信息}，密钥，token有效时长)
  var tokenStr = jwt.sign({ username: req.body.username }, secretKey, {
    expiresIn: "2h",
  });

  res.send({
    status: 200,
    message: "登录成功",
    token: tokenStr,
  });
});

app.post("/upload", upload.array("file", 3), (req, res) => {
  console.log(req.files);

  res.send({
    msg: "success",
    files: req.files,
  });
});
//4.6步骤
app.get("/user/info", (req, res) => {
  let sql = "select * from users";
  db.query(sql, function (error, results, fields) {
    //控制台打印结果
    console.log(results);
    results = results.map((v) => Object.assign({}, v));
    return res.send({
      status: 200,
      message: "请求成功!",
      data: results,
    });
  });
});
app.post("/update", (req, res) => {
  // 接收客户端响应的数据
  const data = req.body;
  console.log(data);
  // 构建sql语句
  const sql = "update user set ? where id=?";
  // 调用bd.query 指定要执行的sql语句
  db.query(sql, [data, data.id], (err, data) => {
    // err为对象是 sql语句执行失败
    if (err) return console.log(err.message);
    // data.affectedRows !== 1 表示 没有被修改的行
    if (data.affectedRows !== 1) return console.log("更新数据失败");
    // 更新成功
    res.send({
      status: 0,
      msg: "更新成功",
    });
  });
});
app.post("/add", (req, res) => {
  console.log(req.body);
  const data = req.body;
  const sql = "insert into user set ?";
  db.query(sql, data, (err, data) => {
    // 判断sql是否连接成功
    if (err) return console.log(err.message);
    //判断受影响的行数 (affectedRows) 看其值是不是1 不为1则写入失败
    if (data.affectedRows !== 1) return console.log("写入数据失败");

    // 如果成功  响应给客户端
    res.send({
      status: 0,
      msg: "数据写入成功",
    });
  });
});
//4.7步骤
app.use((err, req, res, next) => {
  // 如果错误是由token解析失败导致的
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效的token",
    });
  }
  // 如果是其他位置原因导致的错误
  res.send({
    status: 500,
    message: "未知的错误",
  });
  next();
});

//启动服务器
app.listen(5000, function () {
  console.log("express server running at http://127.0.0.1:5000");
});
