var mongoose = require("mongoose");
var path = require('../path');

mongoose.connect(path.mongoosePath);

var addressSchema = mongoose.Schema({
    userID: String,
    detail: String,
    phone: String,
    deleted: {
        type: Boolean,
        default: false
    }
})

var Address = mongoose.model("Address", addressSchema);

module.exports = Address;