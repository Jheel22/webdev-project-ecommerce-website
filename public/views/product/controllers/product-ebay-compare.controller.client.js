(function () {
    angular
        .module('ECOM')
        .controller('productCompareController', productCompareController);

    function productCompareController($routeParams,
                                   $location,
                                   currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.productId = $routeParams.productId;
        model.productName=$routeParams.productName;
        model.user=currentUser;
        model.logout=logout;

        function init() {}


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