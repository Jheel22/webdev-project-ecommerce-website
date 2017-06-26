var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _product:{type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"},
    name: String,
    description: String,
    category: String,
    type: String,
    quantity: Number,
    sellername: String,
    url: String,
    price: Number,
    amount:Number,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'order'});

module.exports = orderSchema;