(function () {
    angular
        .module('ECOM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2,role) {

            if(username==='admin')
            {
                role="ADMIN";
            }
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password,
                            role: role
                        };
                        return userService
                            .register(newUser);
                    }
                )
                .then(function (user) {
                    $location.url('/profile');
                });
        }
    }
})();