var mongoose = require("mongoose");
var path = require('../path');

mongoose.connect(path.mongoosePath);

var commentSchema = mongoose.Schema({
    userID: String,
    orderID: String,
    goodID: String,
    photographerID: String,
    time: {
        type: Date,
        default: Date.now
    },
    detail: String,
    deleted: {
        type: Boolean,
        default: false
    }
})

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;