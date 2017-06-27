var app = require('../../express');
var reviewModel = require('../models/review/review.model.server');

app.get("/api/project/product/:productId/review", findReviewsForProduct);
app.get ('/api/project/review/:reviewId', findReviewById);
app.post('/api/project/product/:productId/review', createReview);
app.put ('/api/project/review/:reviewId', updateReview);
app.delete ('/api/project/product/:productId/review/:reviewId', deleteReview);
app.get   ('/api/project/checkRetailer', checkRetailer);


function isRETAILER(req, res,next) {
    if(req.isAuthenticated() && (req.user.role==='RETAILER' || req.user.role==='ADMIN')) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function findReviewsForProduct(req, res) {

        reviewModel
            .findReviewsForProduct(req.params.productId)
            .then(function (reviews) {
                res.json(reviews);
            })

}

function checkRetailer(req, res) {
    if(req.isAuthenticated() && req.user.role==='RETAILER') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function updateReview(req, res) {
    var review = req.body;
    reviewModel
        .updateReview(req.params.reviewId, review)
        .then(function (status) {
            res.send(status);
        });
}


function deleteReview(req, res) {
    var reviewId = req.params.reviewId;
    var productId = req.params.productId;
    reviewModel
        .deleteReview(productId, reviewId)
        .then(function (review) {
            res.json(review);
        });
}
function createReview(req, res) {
    var review = req.body;
    var productId = req.params.productId;
    reviewModel
        .createReview(productId, review)
        .then(function (review) {
            res.json(review);
        });
}
function findReviewById(req, res) {
    var reviewId = req.params['reviewId'];
    reviewModel
        .findReviewById(reviewId)
        .then(function (review) {
            res.json(review);
        });
}