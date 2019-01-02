var WXBizDataCrypt = require('../util/WXBizDataCrypt')

module.exports = {
    decodeUnionId: decodeUnionId
}

//解密获得unionid的方法
function decodeUnionId(appId, sessionKey, encryptedData, iv) {
    var pc = new WXBizDataCrypt(appId, sessionKey)
    var data = pc.decryptData(encryptedData, iv)
    console.log('解密后 data: ', data)
}