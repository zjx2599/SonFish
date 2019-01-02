const config = require('./config.js')

module.exports = {
  openid: config.baseUrl + config.port + '/openid',
  unionid: config.baseUrl + config.port	+ '/unionid',
  updateUserInfor: config.baseUrl + config.port	+ '/updateUserInfor',
  userBackgroundImage: config.baseUrl + config.port + '/resources/pic/goods/1.jpg'
} 