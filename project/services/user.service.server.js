var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var googleConfig = {
    clientID     : "104002553952-t69r898enlv7qjsbmk6o1p9emr9mfi9d.apps.googleusercontent.com",
    clientSecret : "jURAYj-U3fUq1toTbacYaR-l",
    callbackURL  : "http://localhost:3000/auth/google/callback"
};
if(process.env.USERNAME) { // check if running remotely
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };
}
var facebookConfig = {
    clientID: "1871926423045764",
    clientSecret: "88c3e716c36ff5704e52c9030591e0f1",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
};
if(process.env.USERNAME) {
    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };
}

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
app.get ('/api/project/user/:userId', findUserById);
app.get ('/api/project/user',isAdmin, findAllUsers);
app.get ('/api/project/seller', findAllSellers);
app.get ('/api/project/customer', findAllCustomers);
app.post('/api/project/user', createUser);
app.put ('/api/project/user/:userId', updateUser);
app.delete ('/api/project/user/:userId', deleteUser);

app.put('/api/project/seller/:sellerId/user/:userId/following/:following',updateUserFollowers);
app.post  ('/api/project/login', passport.authenticate('local'), login);
app.get   ('/api/project/loggedin', loggedin);
app.get   ('/api/project/checkAdmin', checkAdmin);
app.get   ('/api/project/checkRetailer', checkRetailer);
app.post  ('/api/project/logout', logout);
app.post  ('/api/project/register', register);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/index.html#!/profile',
        failureRedirect: '/#/login'
    }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/index.html#!/profile',
        failureRedirect: '/#/login'
    }));


function updateUserFollowers(req, res) {
    var seller = req.body;
    userModel
        .updateUserFollowers(req.params.sellerId, seller,req.params.userId,req.params.following)
        .then(function (status) {
            res.send(status);
        });
}

function isAdmin(req, res,next) {
    if(req.isAuthenticated() && req.user.role==='ADMIN') {
        next();
    } else {
        res.sendStatus(401);
    }
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(
            function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        },
            function (error) {
                console.log('Error: ' + error.message);
            }
        );
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
       // console.log("check"+req.user);
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.role==='ADMIN') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkRetailer(req, res) {
    if(req.isAuthenticated() && req.user.role==='RETAILER') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username)
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function login(req, res) {
    res.json(req.user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function updateUser(req, res) {
    var user = req.body;
    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}

function findAllSellers(req, res) {
        userModel
            .findAllSellers()
            .then(function (users) {
                res.json(users);
            });

}

function findAllCustomers(req, res) {
    userModel
        .findAllCustomers()
        .then(function (users) {
            res.json(users);
        });

}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    //console.log(user);
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.displayName;
                    var emailParts = email.split(" ");
                    var newFacebookUser = {
                        username:  emailParts[0].toLowerCase(),
                        firstName: emailParts[0],
                        lastName:  emailParts[1],
                        email:     emailParts[0]+emailParts[1]+"@facebook.com",
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}