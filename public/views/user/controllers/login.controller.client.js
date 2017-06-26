(function () {
    angular
        .module('ECOM')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var model = this;
        model.login = login;

        function login(username, password) {
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password === null || typeof password === 'undefined') {
                model.error = "password does not match";
                return;
            }
            userService
                .login(username, password)
                .then(function (found) {
                    if(found !== null) {
                        $location.url('/profile');
                    } else {
                        model.error = "sorry, " + username + " not found. please try again!";
                    }
                });
        }
    }
})();