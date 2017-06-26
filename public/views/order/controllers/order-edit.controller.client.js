(function () {
    angular
        .module('ECOM')
        .controller('orderEditController', orderEditController);
    
    function orderEditController($routeParams,
                                   $location,
                                   currentUser,
                                   userService,orderService) {
        var model = this;

        model.userId = currentUser._id;
        model.orderId=$routeParams.orderId;
        model.user=currentUser;
        model.updateOrder=updateOrder;
        model.deleteOrder=deleteOrder;
        model.logout=logout;

        function init() {
            orderService
                .findOrderById(model.orderId)
                .then(renderOrder, OrderError);
        }
        init();

        function renderOrder (order) {
            model.order = order;
        }

        function OrderError(order) {
            model.error = "Product not found";
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deleteOrder(orderId) {
            orderService
                .deleteOrder(model.userId,model.orderId)
                .then(function () {
                    $location.url('/order');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function updateOrder(order) {
            orderService
                .updateOrder(model.orderId, order)
                .then(function () {
                    $location.url('/order');
                }, function () {
                    model.error = "Unable to update order";
                });
        }
    }
})();