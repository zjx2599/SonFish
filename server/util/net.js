var formidable = require('formidable');
var request = require('request');



module.exports = {
    postFieldsData: postFieldsData,
    requestData: requestData
}

/**
 * 将前台的post请求封装成Promise形式
 * @param {前台请求} req 
 */
function postFieldsData(req) {
    var form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) {
                reject(err);
                //throw new Error(err);
            }
            if (fields) {
                resolve(fields);
            }
        })
    })
}

/**
 * 将微信服务器请求的函数封装成Promise形式
 * @param {微信开放服务获取openId的接口} url 
 */
function requestData(url) {
    return new Promise((reslove, reject) => {
        request(url, (err, response, body) => {
            if (err) {
                reject(err);
            }
            if (!err && response.statusCode == 200) {
                bodyJson = JSON.parse(body);
                reslove(bodyJson);
            } else {
                reject({
                    code: response.statusCode,
                    body: body
                })
            }
        })
    })
}