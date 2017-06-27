(function(){
    angular
        .module('ECOM')
        .factory('userService', userService);

    function userService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            login: login,
            logout: logout,
            loggedin: loggedin,
            checkAdmin: checkAdmin,
            checkRetailer:checkRetailer,
            register: register,
            deleteUser: deleteUser,
            updateUser: updateUser,
            findAllUsers:findAllUsers,
            findAllSellers:findAllSellers,
            updateUserFollowers:updateUserFollowers,
            updateUserByAdmin:updateUserByAdmin,
            createUserByAdmin:createUserByAdmin,
            findAllCustomers:findAllCustomers
        };
        return api;

        function register(userObj) {
            var url = "/api/project/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkRetailer() {
            var url = "/api/project/checkRetailer";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/project/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {

                    return response.data;
                });
        }

        function updateUserByAdmin(userId, user) {
            var url = "/api/project/admin/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {

                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUserByAdmin(user) {
            var url = "/api/project/admin/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }


        function findUserByUsername(username) {
            var url = "/api/project/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/project/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = "/api/project/user";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllSellers() {
            var url = "/api/project/seller";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCustomers() {
            var url = "/api/project/customer";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUserFollowers(sellerId, seller,userId,following) {
            var url = "/api/project/seller/"+sellerId+"/user/"+userId+"/following/"+following;
            return $http.put(url, seller)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();