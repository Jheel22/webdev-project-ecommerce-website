var connectionString = 'mongodb://127.0.0.1:27017/project'; // for local
if(process.env.USERNAME) { // check if running remotely
    var username = process.env.USERNAME; // get from environment
    var password = process.env.PASSWORD;
    connectionString = process.env.CONNECTION_STRING;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/product.service.server');
require('./services/order.service.server');
require('./services/review.service.server');
require('./services/ebay.service.server');