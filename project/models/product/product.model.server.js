var mongoose = require('mongoose');
var productSchema = require('./product.schema.server');
var productModel = mongoose.model('ProductModel', productSchema);
var userModel = require('../user/user.model.server');

productModel.findAllProducts = findAllProducts;
productModel.createProductForUser = createProductForUser;
productModel.findAllProductsForUser = findAllProductsForUser;
productModel.deleteProductFromUser = deleteProductFromUser;
productModel.findProductById = findProductById;
productModel.updateProduct = updateProduct;
productModel.findProductByProductname=findProductByProductname;
productModel.findProductsByCategory=findProductsByCategory;
productModel.updateProductLikes=updateProductLikes;
productModel.updateProductURL=updateProductURL;
productModel.addReview = addReview;
productModel.deleteReview = deleteReview;

module.exports = productModel;

function deleteReview(productId,reviewId) {
    return productModel
        .findById(productId)
        .then(function (product) {
            var index = product.reviews.indexOf(reviewId);
            product.reviews.splice(index, 1);
            return product.save();
        });
}

function addReview(productId,reviewId) {
    return productModel
        .findById(productId)
        .then(function (product) {
            product.reviews.push(reviewId);
            return product.save();
        });
}

function findProductByProductname(productname) {
    return productModel.findOne({name: productname});
}

function findProductById(productId) {
    return productModel.findById(productId);
}

function updateProduct(productId, newProduct) {
  delete newProduct._user;
  delete newProduct.dateCreated;
    return productModel
        .update({_id: productId}, {$set: newProduct});
}

function deleteProductFromUser(userId, productId) {
    return productModel
        .remove({_id: productId})
        .then(function (status) {
            return userModel
                .deleteProduct(userId, productId);
        });
}

function findAllProductsForUser(userId) {
    return productModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function findAllProducts(type) {
    return productModel.find({type: type});
}

function findProductsByCategory(category) {
    return productModel.find({category: category});
}

function createProductForUser(userId, product) {
    product._user = userId;
    return productModel
        .create(product)
        .then(function (product) {
            return userModel
                .addProduct(userId, product._id)
        })
}

function updateProductLikes(productId, newProduct,userId) {
    if(newProduct.likesId!==undefined && newProduct.likesId!==null && newProduct.likesId!=='') {
        var liked = newProduct.likesId;
        liked.push(userId);
    }
    else{
        var liked=userId;
    }
    newProduct.likesId=liked;
    return productModel
        .update({_id: productId}, {$set: newProduct});
}

function updateProductURL(productId, url) {
    return productModel
        .update({_id: productId}, {$set: {url:url}});
}

/*
function findAllProducts() {
    return productModel.find();
}*/
