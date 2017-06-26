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
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                /*controller: 'mainController',
                 controllerAs: 'model',*/
                 resolve: {
                 currentUser: checkAdmin
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
                    currentUser: checkLoggedIn
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
        /*   .when('/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-choose.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            /!*.when('/user/:userId/website/:websiteId/page/:pageId/widget/new/header', {
             templateUrl: 'views/widget/templates/widget-heading-new.view.client.html',
             controller: 'widgetNewController',
             controllerAs: 'model'
             })
             .when('/user/:userId/website/:websiteId/page/:pageId/widget/new/image', {
             templateUrl: 'views/widget/templates/widget-image-new.view.client.html',
             controller: 'widgetNewController',
             controllerAs: 'model'
             })
             .when('/user/:userId/website/:websiteId/page/:pageId/widget/new/youtube', {
             templateUrl: 'views/widget/templates/widget-youtube-new.view.client.html',
             controller: 'widgetNewController',
             controllerAs: 'model'
             })
             .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/HEADING', {
             templateUrl: 'views/widget/templates/widget-heading-edit.view.client.html',
             controller: 'widgetEditController',
             controllerAs: 'model'
             })
             .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/YOUTUBE', {
             templateUrl: 'views/widget/templates/widget-youtube-edit.view.client.html',
             controller: 'widgetEditController',
             controllerAs: 'model'
             })
             .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/IMAGE', {
             templateUrl: 'views/widget/templates/widget-image-edit.view.client.html',
             controller: 'widgetEditController',
             controllerAs: 'model'
             })*!/
            .when('/website/:websiteId/page/:pageId/widget/:widgetId/search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })*/
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