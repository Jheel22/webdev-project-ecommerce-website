(function () {
    angular
        .module('ECOM')
        .controller('mainController', mainController);

    function mainController($location,
                            currentUser,
                            userService) {
        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }


})();