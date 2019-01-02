var mongoose = require("mongoose");
var path = require('../path');

mongoose.connect(path.mongoosePath);

var orderSchema = new mongose.Schema({
    userID: String,
    goodID: String,
    orderNumber: String,
    createTime: {
        type: Date,
        default: Date.now
    },
    executionTime: Date,
    photographer: String,
    flowID: String,
    finished: Boolean,
    deleted: {
        type: Boolean,
        default: false
    }
});

var Order = mongoose.model("Order", orderSchema);

module.exports = Order;