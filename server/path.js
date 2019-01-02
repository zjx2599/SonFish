const config = require('./config');

module.exports = {
    openidUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid='+ config.appId +'&secret='+ config.appSecret +'&grant_type=authorization_code&js_code=',
    mongoosePath: 'mongodb://localhost/StoneBridge'
}

/*
module.exports = {
    serverPort: '3001',
    appId : 'wx2dfff407981c9a8e',
    appSecret : 'c80d5826f7353170e670da4e3d659e62',
    openidUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx2dfff407981c9a8e&secret=c80d5826f7353170e670da4e3d659e62&grant_type=authorization_code&js_code=',
}
*/
