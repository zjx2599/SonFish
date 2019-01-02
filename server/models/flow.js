var mongoose = require("mongoose");
var path = require('../path');


mongoose.connect(path.mongoosePath);

var flowSchame = new mongoose.Schema({
    currentStep: String,
    create: Date,
    confirm: Date,
    shoot: Date,
    choosePhotos: Date,
    product: Date,
    receive: Date,
    deleted: {
        type: Boolean,
        default: false
    }
});

var Flow = mongoose.model("Flow", flowSchame);

module.exports = Flow;