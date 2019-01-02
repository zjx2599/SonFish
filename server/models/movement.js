var mongoose = require("mongoose");
var path = require('../path');
var config = require('../config');

module.exports = Movement;

mongoose.connect(path.mongoosePath);

var moveSchema = mongoose.Schema({
    name: String,
    picPath: String,
    createBy: String,
    updateBy: [{
        time: Date,
        ID: String
    }],
    expireDate: Date,
    description: String,
    deleted: {
        type: Boolean,
        default: false
    }
})

var Movement = mongoose.model("Movement", moveSchema);

var first = new Movement({
    name: "test",
    picPath: config.baseUrl + '/public/resources/pic/goods/1.jpg',
    description: 'this is first movement'
});

first.save();