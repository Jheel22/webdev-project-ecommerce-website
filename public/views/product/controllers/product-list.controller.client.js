(function () {
    angular
        .module('ECOM')
        .controller('productListController', productListController);
    
    function productListController($routeParams,
                                   currentUser,
                                   $location,
                                   productService,userService) {
        var model = this;
        model.type = $routeParams.type;
        model.logout=logout;
        model.updateProductSearch=updateProductSearch;
        model.userId = currentUser._id;
        model.back=back;
        model.user=currentUser;
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
        function init() {
            if(currentUser.role===undefined)
            {
                model.message="Please login or register to view products in detail";
            }
            if(currentUser.role==='RETAILER')
            {
                productService
                    .findAllProductsForUser(model.userId)
                    .then(renderProducts);
            }
            else {
                productService
                    .findAllProducts(model.type)
                    .then(renderProducts);
            }
        }
        init();

        function back() {
            $location.url('/profile');
        }



        function updateProductSearch(category) {
if(category==='' || category===undefined || category===null)
{
    init();
}
else {
    productService
        .findProductsByCategory(category)
        .then(renderProducts);
}

        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
        function renderProducts(products) {
            model.products = products;
        }
    }
})();