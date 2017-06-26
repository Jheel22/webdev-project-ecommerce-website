(function () {
    angular
        .module('ECOM')
        .service('orderService', orderService);

    function orderService($http) {
        var api = {
            findAllOrders: findAllOrders,
            findOrderForUser: findOrderForUser,
            findOrderForSeller: findOrderForSeller,
            findOrderById: findOrderById,
            deleteOrder: deleteOrder,
            createOrder: createOrder,
            updateOrder: updateOrder
        }
        return api;

        function checkRetailer() {
            var url = "/api/project/checkRetailer";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createOrder(order,userId) {
            var url = "/api/project/user/"+userId+"/order";
            return $http.post(url, order)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteOrder(userId,orderId) {
            var url = "/api/project/user/"+userId+"/order/" + orderId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findOrderById(orderId) {
            var url = "/api/project/order/"+orderId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function updateOrder(orderId, order) {
            var url = "/api/project/order/"+orderId;
            return $http.put(url, order)
                .then(function (response) {
                    return response.data;
                });
        }

        function findOrderForUser(userId) {
            var url = "/api/project/user/"+userId+"/order";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function findOrderForSeller(userId) {
            var url = "/api/project/seller/"+userId+"/order";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function findAllOrders() {
            var url = "/api/project/order";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();