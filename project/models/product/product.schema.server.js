var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    category: String,
    type: String,
    quantity: Number,
    sellername: String,
    url: String,
    price: Number,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    likes: {type: Number,default:0},
    likesId:[String],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'product'});

module.exports = productSchema;