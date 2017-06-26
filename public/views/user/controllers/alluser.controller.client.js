(function () {
    angular
        .module('ECOM')
        .controller('allUserController', allUserController);

    function allUserController($location,
                               currentUser,
                               userService) {

        var model = this;
        model.userId = currentUser._id;
        model.user=currentUser;
        model.updateUser = updateUser;
        model.deleteUser=deleteUser;
        model.logout = logout;
        function init() {
                userService
                    .findAllUsers()
                    .then(renderUsers);

        }

        init();
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    init();
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function updateUser(userid) {
            if(user.role === null || user.role === '' || typeof user.role === 'undefined') {
                user.role = role;
            }
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                })
        }

        function renderUsers(users) {
            model.users=users;
        }
    }
})();