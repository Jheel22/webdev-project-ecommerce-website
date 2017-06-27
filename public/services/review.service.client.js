(function () {
    angular
        .module('ECOM')
        .service('reviewService', reviewService);

    function reviewService($http) {
        var api = {
            findReviewsForProduct: findReviewsForProduct,
            findReviewById: findReviewById,
            deleteReview: deleteReview,
            createReview: createReview,
            updateReview: updateReview
        }
        return api;

        function checkRetailer() {
            var url = "/api/project/checkRetailer";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createReview(review,productId) {
            var url = "/api/project/product/"+productId+"/review";
            return $http.post(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteReview(productId,reviewId) {
            var url = "/api/project/product/"+productId+"/review/" + reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewById(reviewId) {
            var url = "/api/project/review/"+reviewId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function updateReview(reviewId, review) {
            var url = "/api/project/review/"+reviewId;
            return $http.put(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewsForProduct(productId) {
            var url = "/api/project/product/"+productId+"/review";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();