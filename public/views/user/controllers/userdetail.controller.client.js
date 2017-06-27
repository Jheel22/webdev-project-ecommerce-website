(function () {
    angular
        .module('ECOM')
        .controller('userDetailController', userDetailController);

    function userDetailController($routeParams, $location, userService,currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.user=currentUser;
        model.selectedUserId=$routeParams.userId;
        model.selectedUser=currentUser;
        model.logout = logout;

        function init() {

                userService
                    .findUserById(model.selectedUserId)
                    .then(renderUser);


        }

        init();

        function renderUser(user) {
            model.selectedUser = user;
        }
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();