var Goods = require("../models/goods.js");

exports.findAll = function (req, res) {
    Goods.find({}, function (err, results) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
}


exports.findAllGoods = function (req, res) {
    Goods.findAllGoods(function (results) {
        res.send(results)
    });
}