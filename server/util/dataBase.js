var mongoose = require('mongoose');
var path = require('../path');

var mongoose = mongoose.connect(path.mongoosePath);

module.exports = {
    mongoose : mongoose
}