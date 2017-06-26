(function () {
    angular
        .module('ECOM')
        .controller('productNewController', productNewController);
    
    function productNewController($location,
                                  currentUser,
                                   productService,userService) {
        var model = this;
        model.userId = currentUser._id;
        model.user=currentUser;
        model.createProduct = createProduct;
        model.logout=logout;
        model.productList=[
            { name: "Books" },
            { name: "Electronics" },
            { name: "Beauty" },
            { name: "Health" },
            { name: "Jewelry & Accessories" },
            { name: "Food" },
            { name: "Clothes" },
            { name: "Footwear" }
        ];
        model.serviceList=[
            { name: "Event Management" },
            { name: "Gift wrapping & decoration " },
            { name: "Repairs" },
            { name: "Technical Assistant" },
            { name: "Driving" },
            { name: "Gardening, Cleaning & Shoveling" },
            { name: "Dog Walking" },
            { name: "Baby Sitting" },
            { name: "Tutoring Services" }
        ];
        model.typeList = [
            {
                name: "product"
            },
            {
                name: "service"
            }
        ];
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
        function createProduct(product) {
           if(typeof product === 'undefined')
           {
               model.error = 'Product name is required';
               return;
           }
            if(product.name === null || product.name === '' || typeof product.name === 'undefined') {
                model.error = 'Product name is required';
                return;
            }
            productService
                .findProductByProductname(product)
                .then(
                    function () {
                        model.error = "sorry, that website name is taken";
                    },
                    function () {
                        product.sellername=model.user.username;
                        return productService
                            .createProduct(product,model.userId);
                    }
                )
                .then(function (user) {
                    $location.url('/product');
                });
        }
    }
})();