var path = require('../path');
var net = require('../util/net');
var userCtl = require('./userCtl')


module.exports = {
    getOpenId: getOpenId
}

/**
 * 从前台获得wx.login()方法产生的code，再将code组合到微信服务器的开放接口url中，获得微信服务器返回的openId
 * @param {前台的请求} req 
 * @param {服务器响应} res 
 */
async function getOpenId(req, res) {
    try {
        let url = path.openidUrl + req.fields.code;
        let body = await net.requestData(url);
        let result = await userCtl.create(body.openid);
        //等待创建用户信息完成以后，再发送openid回客户端
        if(result == 1){
            res.send(body.openid);
        }
    } catch (e) {
        console.log(e);
    }
}


/* async function getOpenId(req, res){
    try{
       let fields = await net.postFieldsData(req)
       console.log(fields);
       let url = path.openidUrl + fields.code;
       let openId = await net.requestData(url);
       res.send(openId);
    }catch(e){
        console.log(e);
    }  
} */

/*async function goToLogin(req,res){
    
}*/




//这两个变量分别存储getOpenid获得的session_key和getUnionId获得的用户加密信息
//因为这两个函数是异步的，不能预测那个函数会先获得数据，所以将两个函数获得数据分别
//存储到全局变量中，然后在getOpenId和getUnionId中进行判断，那个函数返回后满足条件
//就调用decode模块中的方法进行解密
//UnionId 使用 wx.getUserInfo 解密获得的话，需要用户授权
//如果开发者帐号下存在同主体的公众号或移动应用，并且该用户已经授权登录过该公众号或移动应用。
//开发者也可以直接通过 wx.login + code2Session 获取到该用户 UnionID ，无须用户再次授权
let sessionKey = null;
let unionIdRes = null;

//nodejs  异步单线程，事件驱动。所以不能像同步编程使用return返回函数运行结果，直接调用函数。
//只能使用callback回调函数，进行函数调用
//所以nodejs会有层层的回调，实现函数间的数据传输。
//所以也不会使用全局变量进行数据共享，因为这个全局变量何时赋值，并不确定。
//global.bodyJson = '';

//先使用回调嵌套实现逻辑
//再使用promise() then()实现代码
//验证函数的调用
//再将处理post 和 request 的代码段封装到net模块

//看完es6/7/8语法
//快速看完小程序教程，主要是填坑
//开始开发



/*function getOpenId(req, res, callback) {
    postData(req, res, function (fields, unll) {
        var url = path.openidUrl + fields.code;
        request(url, function (err, response, body) {
            if (err) {
                console.log('err in function request' + err);
                return;
            }
            if (!err && response.statusCode == 200) {
                console.log(body);
                bodyJson = JSON.parse(body);
                res.send(bodyJson.openid);
            }
        })
    })
}*/


/*function getUnionId(req, res) {
    var form = new formidable.IncomingForm();
    var wxres = res;
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
            return;
        }
        if (fields) {
            unionIdRes = fields;
        }
    })
}*/

/*async function postData(req, res) {
      var form = new formidable.IncomingForm();
      var fields = await form.parse(req);
      return fields;
}

function getOpenId(req,res){
      await postData(req,res).then(console.log);
      //console.log(fields);
}*/

/*function postData(req, res, callback) {
    console.log('1')
    var form = new formidable.IncomingForm();
    var wxres = res;
    form.parse(req, function (err, fields, files) {
        console.log('2');
        if (err) {
            console.log('err in function postData ' + err);
            return;
        }
        if (fields) {
            callback(fields, files);
        }
    })
}*/



/*async function postData(req){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err){
            throw new Error(err);
        }
        if(fields){
            return fields;
        }
    })
}*/