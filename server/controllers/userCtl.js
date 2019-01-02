var User = require("../models/user");

module.exports = {
    create,
    update,
    findByOpenId
}

async function create(openId) {
    try {
        let results = await findByOpenId(openId);
        if (results.length == 0) {
            let user = new User({
                openId: openId
            })
            user.save();
        }
        return 1;
    } catch (e) {
        console.log(e);
        return 0;
    }
}

async function update(req, res) {
    try {
        console.log(req.fields.openid, req.fields.userInfor)
        //使用updateMany,防止有多相同openId的collection
        User.updateMany({
            openId: req.fields.openid
        }, {
            userInfo: req.fields.userInfor
        }, {
            multi: true
        }, function (err, raw) {
            if (err) {
                console.log(err);
            }
            console.log(raw);
        })
        res.send('1');
    } catch (e) {
        console.log(e)
    }
}

async function findByOpenId(openId) {
    const results = await User.find({
        openId: openId
    });
    return results;
}


//findByOpenId('oujCf4jtGSGKyaqljfnfYfiKHc9w');