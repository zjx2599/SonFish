var mongoose = require("mongoose");
var path = require('../path');

mongoose.connect(path.mongoosePath);

//var dataBase = require('../util/dataBase');

//dataBase.mongoose;

module.exports = Goods;

var goodsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    picPath: String,
    count: Number,
    createBy: String,
    updateBy: [{
        time: Date,
        ID: String
    }],
    comments: [String],
    deleted: {
        type: Boolean,
        default: false
    }
});

//static静态方法，使用类进行调用
goodsSchema.statics.findAllGoods = function (callback) {
    this.find({}, function (err, results) {
        if (err) {
            console.log("err function findAll in model goods.js")
        }
        callback(results);
    });
}

goodsSchema.statics.findGoodsByName = function (name, callback) {
    this.find({
        name: name
    }, function (err, results) {
        if (err) {
            console.log("err function findGoodsByName in model goods.jsc");
            return;
        }
        callback(results);
    })
};

//method方法，使用类实例调用
goodsSchema.methods.del = function () {

};

//last statement
var Goods = mongoose.model("Goods", goodsSchema);

/*var first = new Goods({
    name : "First",
    price : 500,
    description : "This is first goods for test",
    picPath : "resources/pic/goods/1.jpg"
})

first.save();*/