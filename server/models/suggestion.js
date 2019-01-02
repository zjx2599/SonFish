var mongoose = require("mongoose");
var path = require('../path');

mongoose.connect(path.mongoosePath);

var suggestionSchema = mongoose.Schema({
    deleted: {
        type: Boolean,
        default: false
    }

})

var Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;