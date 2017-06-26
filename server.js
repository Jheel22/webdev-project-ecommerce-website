var app = require('./express');
//var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: "put some text here" })); //later transfer this to env param
app.use(passport.initialize());
app.use(passport.session());

app.use(app.express.static(__dirname + '/public'));
require("./project/app")
var port = process.env.PORT || 3000;

app.listen(port);