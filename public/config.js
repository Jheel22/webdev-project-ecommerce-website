(function () {
    angular
        .module('ECOM',['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
         .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
          .when('/product', {
                templateUrl: 'views/product/templates/product-list.view.client.html',
                controller: 'productListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/product/new', {
                templateUrl: 'views/product/templates/product-new.view.client.html',
                controller: 'productNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkRetailer
                }
            })
            .when('/product/:productId', {
                templateUrl: 'views/product/templates/product-edit.view.client.html',
                controller: 'productEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkRetailer
                }
            })
            .when('/viewproducts/:type', {
                templateUrl: 'views/product/templates/product-list-customer.view.client.html',
                controller: 'productListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/viewproduct/:productId', {
                templateUrl: 'views/product/templates/product-view.view.client.html',
                controller: 'productEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/productcompare/:productId/name/:productName', {
                templateUrl: 'views/product/templates/product-ebay-compare.view.client.html',
                controller: 'productCompareController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/allsellers', {
                templateUrl: 'views/user/templates/all-sellers.view.client.html',
                controller: 'allSellerController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/allorders', {
                templateUrl: 'views/order/templates/order-list.view.client.html',
                controller: 'orderListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/order/:orderId', {
                templateUrl: 'views/order/templates/order-view.view.client.html',
                controller: 'orderEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/allusers', {
                templateUrl: 'views/user/templates/all-users.view.client.html',
                controller: 'allUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/user/details/:userId', {
                templateUrl: 'views/user/templates/user-detail-view.view.client.html',
                controller: 'userDetailController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
    }

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkAdmin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkRetailer(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkRetailer()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }


    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
})();