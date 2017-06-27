var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addProduct = addProduct;
userModel.deleteProduct = deleteProduct;
userModel.addOrder = addOrder;
userModel.deleteOrder = deleteOrder;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.updateProductsLiked=updateProductsLiked;
userModel.findUserByFacebookId=findUserByFacebookId;
userModel.findAllSellers=findAllSellers;
userModel.findAllCustomers=findAllCustomers;
userModel.updateUserFollowers=updateUserFollowers;
userModel.updateFollowing=updateFollowing;
userModel.updateUserByAdmin=updateUserByAdmin;
userModel.createUserByAdmin=createUserByAdmin;
module.exports = userModel;


function updateUserFollowers(sellerId, newSeller,userId,following) {
    if(newSeller.listOfFollowers!==undefined && newSeller.listOfFollowers!==null && newSeller.listOfFollowers!=='') {
        var liked = newSeller.listOfFollowers;
        liked.push(userId);
    }
    else{
        var liked=userId;
    }
    newSeller.listOfFollowers=liked;
    return userModel
        .update({_id: sellerId}, {$set: newSeller})
        .then(function (seller) {
            return userModel
                .updateFollowing(userId,following)
        })
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}


function deleteProduct(userId, productId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.products.indexOf(productId);
            user.products.splice(index, 1);
            return user.save();
        });
}

function addProduct(userId, productId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.products.push(productId);
            return user.save();
        });
}

function createUser(user) {
    return userModel.create(user);
}

function createUserByAdmin(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findAllSellers() {
    return userModel.find({role: 'RETAILER'});
}

function findAllCustomers() {
    return userModel.find({role: 'CUSTOMER'});
}


function findUserByCredentials(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}

function updateUserByAdmin(userId, newUser) {
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}

function updateProductsLiked(userId, productId,pliked) {
    return userModel.update({_id: userId}, {$set: {productsLiked:pliked}});
}

function updateFollowing(userId, following) {
    return userModel.update({_id: userId}, {$set: {noOfFollowers:following}});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function deleteOrder(userId, orderId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.orders.indexOf(orderId);
            user.orders.splice(index, 1);
            return user.save();
        });
}

function addOrder(userId, orderId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.orders.push(orderId);
            return user.save();
        });
}