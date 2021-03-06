var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _product:{type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"},
    text: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'review'});

module.exports = reviewSchema;