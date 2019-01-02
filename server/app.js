//var url = require('url');
//var querystring = require('querystring');
//var formidable = require('formidable')
var express = require("express");
var app = express();
var session = require('express-session');
var bodyparser = require('body-parser');
var controller = require("./controllers/testCtl");
var Goods = require("./controllers/goodsCtl");
var config = require('./config');
var formidableMiddleware = require('express-formidable');

var loginCtl = require('./controllers/loginCtl')
var userCtrl = require('./controllers/userCtl')

//使用中间件
app.use(formidableMiddleware());


app.set('views', 'public/html/'); //设置模板的目录
app.set('view engine', 'html'); // 设置解析模板文件类型：这里为html文件
app.engine('html', require('ejs').__express); // 使用ejs引擎解析html文件中ejs语法

//使用下面一行的中间件会使得 formidable 不能解析 post 请求数据,禁用这行，并使用express-formidable
//app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true })); 

// 使用 session 中间件
/**
 * 当浏览器第一次发出req请求后，服务器为这个req产生一个connect.sid,
 * 并通过res设置浏览器短的cookies发送回浏览器，以此保存sid到浏览器的cookies中，
 * 并定时维护更新加密签名的sid，当浏览器再次访问服务器的时候，
 * 通过req中的sid定位服务器内存中的session实例，通过设置session实例
 * 的参数，可以定义判断用户目前的登录状态。
 */
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : false,
    httpOnly: true,
    saveUninitialized: true, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 15, // 设置 session 的有效时间，单位毫秒
    },
}));
// 获取登录页面
app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/html/login.html')
});

// 用户登录
app.post('/login', function(req, res){
    if(req.body.username == 'admin' && req.body.pwd == 'admin123'){
        req.session.userName = req.body.username; // 登录成功，设置 session
        res.redirect('/');
    }
    else{
        res.json({ret_code : 1, ret_msg : '账号或密码错误'});// 若登录失败，重定向到登录页面
    }
});
// 获取主页
 app.get('/', function (req, res) {
    if(req.session.userName){  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('home',{username : req.session.userName});
    }else{
        res.redirect('login');
    }
})

// 退出
app.get('/logout', function (req, res) {
    // 通过Cookies中的connect.sid定位服务器内存中的session实例，
    //以此一一对应定位req，定位session实例以后以后检查session.username的值，就可以判断目前这个req在服务器端的登录状态
    req.session.userName = null; 
    res.redirect('login');
}); 
 





//设置静态文件访问路径
app.use(express.static(config.static));

//test
app.get("/test", controller.test);
//获得所有套餐
app.get("/getAllGoods", Goods.findAllGoods);
//获取前台code,调用微信开放接口获取openId。并根据openid创建用户
app.post("/openid", loginCtl.getOpenId);
//解密userInfo获得unionId
//app.post('/unionid',login.getUnionId);
//前台管理页面登录处理
//app.get("/manage", login.check);
//获取前台传来的userInfor，update数据库
app.post("/updateUserInfor", userCtrl.update)

app.listen(config.serverPort);





    //将url json化
    /*var urljson = url.parse(req.url);
    //获得query字段
    var qs = urljson.query;
    //将qs json化
    var qsjson = querystring.parse(qs);
    console.log(qsjson.code);*/