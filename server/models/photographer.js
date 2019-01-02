var mongoose = require("mongoose");
var path = require('../path');

mongoose.connect(path.mongoosePath);

var photographerSchema = mongoose.Schema({
    name: String,
    avatarUrl: String,
    comments: [String],
    deleted: {
        type: Boolean,
        default: false
    }
})

var Photographer = mongoose.model("Photographer", photographerSchema);

module.exports = Photographer;