var mongoose = require("mongoose");
var path = require('../path');

mongoose.connect(path.mongoosePath);

var userSchema = new mongoose.Schema({
      userInfo: String,
      name: String,
      password: String,
      nickName: String,
      openId: String,
      sessionKey: String,
      unionId: String,
      //avatarUrl: String,
      phone: String,
      adderss: [],
      userGroup: String,
      registerTime: {
            type: Date,
            default: Date.now
      },
      orderId: [],
      deleted: {
            type: Boolean,
            default: false
      }
});

/*userSchema.static.findByOpenId = async function(openid){
      let res = await this.find({openid:openid});
      return res;
}*/

userSchema.statics.findByOpenId = function (openid, callback) {
      this.find({
            openid: openid
      }, function (err, results) {
            if (err) {
                  console.log("err function findByOpenId in model user.js")
            }
            callback(results);
      });
}


var User = mongoose.model("User", userSchema);

module.exports = User;