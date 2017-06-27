(function () {
    angular
        .module('ECOM')
        .controller('editReviewController', editReviewController);

    function editReviewController($routeParams,$location,
                               currentUser,
                               reviewService,userService) {

        var model = this;
        model.userId = currentUser._id;
        model.user=currentUser;
        model.productId = $routeParams.productId;
        model.updateReview = updateReview;
        model.deleteReview=deleteReview;
        model.cancelUpdate=cancelUpdate;
        model.saveUpdateReview=saveUpdateReview;
        model.logout = logout;

        function init() {
                reviewService
                    .findReviewsForProduct(model.productId)
                    .then(renderReviews);

        }

        init();
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deleteReview(review) {
                reviewService
                    .deleteReview(model.productId,review._id)
                    .then(function () {
                        init();
                    }, function () {
                        model.error = "Unable to delete review you";
                    });

        }

        function updateReview(review) {
model.name=review.text;
model.editReview=angular.copy(review);
        }
        function saveUpdateReview() {
            model.editReview.text=model.name;
            reviewService
             .updateReview(model.editReview._id, model.editReview)
             .then(function () {
                 model.name=null;
             init();
             })
        }
        function cancelUpdate() {
            model.name=null;
        }

        function renderReviews(reviews) {
            model.reviews=reviews;
        }
    }
})();