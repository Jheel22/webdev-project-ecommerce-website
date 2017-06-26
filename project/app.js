var connectionString = 'mongodb://127.0.0.1:27017/project'; // for local
if(process.env.USERNAME) { // check if running remotely
    var username = process.env.USERNAME; // get from environment
    var password = process.env.PASSWORD;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds135252.mlab.com:35252/heroku_krl15f78'; // user yours
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/product.service.server');
require('./services/order.service.server');