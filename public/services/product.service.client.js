(function () {
    angular
        .module('ECOM')
        .service('productService', productService);

    function productService($http) {
        var api = {
            findAllProducts: findAllProducts,
            findAllProductsForUser: findAllProductsForUser,
            findProductById: findProductById,
            deleteProduct: deleteProduct,
            createProduct: createProduct,
            updateProduct: updateProduct,
            updateProductLikes:updateProductLikes,
            findProductByProductname: findProductByProductname,
            findProductsByCategory:findProductsByCategory
        }
        return api;

        function checkRetailer() {
            var url = "/api/project/checkRetailer";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createProduct(product,userId) {
            var url = "/api/project/user/"+userId+"/product";
            return $http.post(url, product)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteProduct(userId,productId) {
            var url = "/api/project/user/"+userId+"/product/" + productId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findProductById(productId) {
            var url = "/api/project/product/"+productId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function updateProduct(productId, product) {
            var url = "/api/project/product/"+productId;
            return $http.put(url, product)
                .then(function (response) {
                    return response.data;
                });
        }
        function updateProductLikes(productId, product,userId) {
            var url = "/api/project/product/"+productId+"/user/"+userId;
            return $http.put(url, product)
                .then(function (response) {
                    return response.data;
                });
        }
        function findProductByProductname(product) {
            var url = "/api/project/user/:userId/product?productname="+product.name;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function findAllProductsForUser(userId) {
            var url = "/api/project/user/"+userId+"/product";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function findAllProducts(type) {
            var url = "/api/project/product/type/"+type;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function findProductsByCategory(category) {
            var url = "/api/project/product/category/"+category;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();