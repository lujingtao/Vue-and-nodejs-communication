var express             = require('express');
var app                 = express();
var bodyParse           = require('body-parser')

//增加头部信息解决跨域问题
app.all('*', function (req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");//允许源访问，本利前端访问路径为“http://localhost:8080”
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
});


//使用bodyParse解释前端提交数据
app.use(bodyParse.urlencoded({extended:true})) ;
app.use(bodyParse.json());

// 处理根目录的get请求
app.get('/',function(req,res){
}) ;

// 处理/login请求
app.post('/login',function(req,res){
    //获取登录名称和密码
    name=req.body.name ;
    pwd=req.body.pwd;
    //向前台反馈信息
    res.status(200).send(
        "后台反馈信息：登录帐号："+name+" | 登录密码："+pwd
      ) ;
});

// 监听3000端口
var server=app.listen(3000);

console.log("服务器已运行");
console.log("监听网址为:http://127.0.0.1:3000/");