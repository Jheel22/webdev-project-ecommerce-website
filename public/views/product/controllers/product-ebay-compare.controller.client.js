(function () {
    angular
        .module('ECOM')
        .controller('productCompareController', productCompareController);

    function productCompareController($http,$routeParams,
                                   $location,
                                   currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.productId = $routeParams.productId;
        model.productName=$routeParams.productName;
        model.user=currentUser;
        _cb_findItemsByKeywords=_cb_findItemsByKeywords;
        model.dofunction=dofunction;
        model.logout=logout;

        function init() {
            var model = this;
            $http.get('/api/project/product/chocolates')
                .then(renderWord);

            function renderWord(response) {

                model.items = response.data;
            }
        }


        init();


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();