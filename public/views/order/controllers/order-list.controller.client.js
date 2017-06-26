(function () {
    angular
        .module('ECOM')
        .controller('orderListController', orderListController);
    
    function orderListController(currentUser,
                                   $location,
                                   orderService,userService) {
        var model = this;
        model.logout=logout;
        model.userId = currentUser._id;
        model.user=currentUser;

        function init() {
            if(currentUser.role==='CUSTOMER') {
                orderService
                    .findOrderForUser(model.userId)
                    .then(renderOrders);
            }
            else
            {
                orderService
                    .findOrderForSeller(model.user.username)
                    .then(renderOrders);
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
        function renderOrders(orders) {
            model.orders = orders;
        }
    }
})();