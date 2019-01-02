var mongoose = require("mongoose");
var path = require('../path');

mongoose.connect(path.mongoosePath);

var afterSaleSchema = mongoose.Schema({
    deleted: {
        type: Boolean,
        default: false
    }
})

var AfterSale = mongoose.model("AfterSale", afterSaleSchema);

module.exports = AfterSale;