(function () {
    angular
        .module('ECOM')
        .controller('profileController', profileController);

    function profileController($location,
                               currentUser,
                               userService,orderService,productService) {

        var model = this;
        model.userId = currentUser._id;
        model.user=currentUser;
        model.size=currentUser.orders.length;
        model.pro=currentUser.products.length;
        model.allusers=0;
        model.allproducts=0;
        model.allservices=0;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            if(currentUser.role==='RETAILER')
            {
                orderService
                    .findOrderForSeller(model.user.username)
                    .then(renderOrders);
            }
            if(currentUser.role==='ADMIN')
            {
                userService
                    .findAllUsers()
                    .then(renderUsers);
                orderService
                    .findAllOrders()
                    .then(renderOrders);
                productService
                    .findAllProducts("product")
                    .then(renderProducts);
                productService
                    .findAllProducts("service")
                    .then(renderServices);
            }
            renderUser(currentUser);
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
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function updateUser(user,role) {
            if(user.role === null || user.role === '' || typeof user.role === 'undefined') {
                user.role = role;
            }
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                })
        }

        function renderUser(user) {
            model.user = user;
        }
        function renderUsers(users) {
            model.allusers=users.length;
        }
        function renderProducts(products) {
            model.allproducts=products.length;
        }
        function renderServices(services) {
            model.allservices=services.length;
        }
        function renderOrders(orders) {
            model.size = orders.length;
        }

        function userError(error) {
            model.error = "User not found";
        }
    }
})();