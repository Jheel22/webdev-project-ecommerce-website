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
        model.editUser=currentUser;
        model.updateUser = updateUser;
        model.deleteUser=deleteUser;
        model.cancelUpdate=cancelUpdate;
        model.saveUpdateUser=saveUpdateUser;
        model.addUser=addUser;
        model.back=back;
        model.nuser=0;
        model.logout = logout;
        model.message="Any new user created by admin will have the default password same as username";
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
        function back() {
            $location.url('/profile');
        }

        function deleteUser(user) {
            if(user.role!=='ADMIN') {
                userService
                    .deleteUser(user._id)
                    .then(function () {
                        init();
                    }, function () {
                        model.error = "Unable to unregister you";
                    });
            }
        }

        function updateUser(user) {
            model.nuser=1;
model.name=user.username;
model.role=user.role;
model.editUser=user;
        }
        function saveUpdateUser() {
            model.editUser.username=model.name;
            model.editUser.role=model.role;
            userService
             .updateUserByAdmin(model.editUser._id, model.editUser)
             .then(function () {
                 model.nuser=0;
                 model.name=null;
                 model.role=null;
             init();
             })
        }
        function addUser() {
            var user=angular.copy(model.editUser);
            user.username=model.name;
            user.role=model.role;
            user.password=model.name;
            delete user._id;
            userService
                .createUserByAdmin(user)
                .then(function () {
                    model.nuser=0;
                    model.name=null;
                    model.role=null;
                    init();
                })
        }
        function cancelUpdate() {
            model.nuser=0;
            model.name=null;
            model.role=null;

        }

        function renderUsers(users) {
            model.users=users;
        }
    }
})();