var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    companyname: String,
    contactnumber: Number,
    type: String,
    role: {type: String, enum:['ADMIN','CUSTOMER','RETAILER']},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"}],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: "OrderModel"}],
    google: {
        id:    String,
        token: String
    },
    facebook: {
        id:    String,
        token: String
    },
    productsLiked:String,
    noOfProductsLiked:{type:Number,default:0},
    orderIds:[String],
    listOfFollowers: [String],
    noOfFollowers: {type:Number,default:0},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;