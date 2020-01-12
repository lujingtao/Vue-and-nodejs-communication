
# 前言
本文记录vue前端+nodejs后端通讯最简单的方法，供广大网友最快速进入全栈开发。

# 效果演示
本示例效果如下：前端是一个登陆表单，信息提交给后端，后端收到后给前端反馈信息。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200112211239771.gif)

# 技术架构
前端 vue + axios + wepack
后端 nodejs + express

# 前端部分
## 安装部署
前端安装vue，方式多种，本文使用vue-cli3 + vue ui图形化安装，具体请百度，命令如下：
安装 vue-cli3：`npm i  @vue/cli -g`  
vue图形化安装：`vue ui`
安装 axios 用于和后端通讯：`npm i axios -s`

## 前端代码
然后我们打开“App.vue”，把代码改成如下：
建立了一个登陆表单，提交按钮点击后向“http://127.0.0.1:3000/login”这个后端地址post表单数据。

```html
<template>
    <div>
        <form method="post">
            账号 :
            <input type="text" id="name" />
            <br /><br />
            密码 :
            <input type="text" id="pwd" />
            <br /><br />
            <input type="button" value="提交" @click="submit">
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        methods: {
            submit() {
                var name = document.getElementById("name").value;
                var pwd = document.getElementById("pwd").value;
                if (name == "" || pwd == "") {
                    alert("帐号和密码不能为空")
                } else {
                    //向服务器提交数据
                    axios.post('http://127.0.0.1:3000/login', {
                            name: name,
                            pwd: pwd
                        })
                        .then(function(response) {
                            //成功时服务器返回 response 数据
                            alert(response.data)
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            }
        },
    }
</script>
```
## 运行前端终端
此时我们运行终端，在终端输入`npm run serve`，运行后打开`http://localhost:8080/` 能看到我们的前端页面效果。


# 后端部分
## 安装部署
后端需要安装 express 和 body-parser（用于解析前端post过来的数据），顺便安装 nodemon（用于后端热更新）
安装 express：`npm i express -s`
安装 body-parser： `npm i body-parser -s`
安装 nodemon `npm i nodemon -d`

## 后端代码：
安装完后，在src目录下建立serve.js，然后输入如下代码，代码功能请看注释，<font color="red">注意跨域部分</font>：

```js
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
```
## 运行后端终端
此时我们<font color="red">新建一个终端</font>，运行如下代码：
进入src目录 `cd src`
运行serve.js `nodemon serve.js`

运行效果如下，本文以vscode为例：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200112211951774.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2lhbWx1amluZ3Rhbw==,size_16,color_FFFFFF,t_70)
此时后端服务已经建立起来，然后我们访问前端入口 `http://localhost:8080/`，就可以看到“演示效果”了。

# 结语
至此整个过程结束，可以以此为基础开发更多功能。

# 项目源码
GitHub： [https://github.com/lujingtao/Vue-and-nodejs-communication](https://github.com/lujingtao/Vue-and-nodejs-communication)