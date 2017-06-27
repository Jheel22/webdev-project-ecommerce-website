var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('ReviewModel', reviewSchema);
var productModel = require('../product/product.model.server');


reviewModel.createReview = createReview;
reviewModel.findReviewsForProduct = findReviewsForProduct;
reviewModel.deleteReview = deleteReview;
reviewModel.findReviewById = findReviewById;
reviewModel.updateReview = updateReview;
module.exports = reviewModel;



function findReviewById(reviewId) {
    return reviewModel.findById(reviewId);
}

function updateReview(reviewId, newReview) {
  delete newReview._user;
  delete newReview._product;
  delete newReview.dateCreated;
    return reviewModel
        .update({_id: reviewId}, {$set: newReview});
}

function deleteReview(productId, reviewId) {

    return reviewModel
        .remove({_id: reviewId})
        .then(function (status) {
            return productModel
                .deleteReview(productId, reviewId);
        });
}

function findReviewsForProduct(productId) {

    return reviewModel
        .find({_product: productId})
        .populate('_product')
        .exec();
}

function createReview(productId, review) {
    return reviewModel
        .create(review)
        .then(function (review) {
            return productModel
                .addReview(productId, review._id)
        })
}

