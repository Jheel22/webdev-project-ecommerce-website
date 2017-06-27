(function () {
    angular
        .module('ECOM')
        .controller('productEditController', productEditController);
    
    function productEditController($routeParams,
                                   $location,
                                   currentUser,
                                   productService,
                                   userService,orderService,reviewService) {
        var model = this;

        model.userId = currentUser._id;
        model.productId = $routeParams.productId;
        model.user=currentUser;
        model.alreadyliked=0;
        model.amount=0;
        model.updateProductLikes = updateProductLikes;
        model.updateProduct=updateProduct;
        model.deleteProduct=deleteProduct;
        model.orderProduct=orderProduct;
        model.addReview=addReview;
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

        function init() {
            productService
                .findProductById(model.productId)
                .then(renderProduct, ProductError);

            reviewService
                .findReviewsForProduct(model.productId)
                .then(renderReviews);
        }
        init();

        function renderProduct (product) {
            model.product = product;
            if(model.product.likesId.indexOf(model.userId)>-1)
            {

model.alreadyliked=1;
            }
        }

        function ProductError(product) {
            model.error = "Product not found";
        }
        function renderReviews(reviews) {
            model.reviews = reviews;
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deleteProduct(productId) {
            productService
                .deleteProduct(model.userId,model.productId)
                .then(function () {
                    if(currentUser.role==="ADMIN")
                    {
                        $location.url('/profile');
                    }
                    else {
                        $location.url('/product');
                    }
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function updateProduct(product) {
            productService
                .updateProduct(model.productId, product)
                .then(function () {
                    if(currentUser.role==="ADMIN")
                    {
                        $location.url('/profile');
                    }
                    else {
                        $location.url('/product');
                    }
                }, function () {
                    model.error = "Unable to update product";
                });
        }
        function orderProduct(product,quant) {
            if(model.product.type==='service')
            {
                model.amount = model.product.price;
                product._user = model.userId;
                product._product = model.productId;
                product.amount = model.amount;
                orderService
                    .createOrder(model.product, model.userId)
                    .then(function (user) {
                        $location.url('/profile');
                    });
            }
            else {
                if (model.amount == 0 || model.qty != quant) {


                    model.qty = quant;
                    var quantity = model.quant * model.product.price;
                    model.amount = quantity;

                }
                else {
                    product._user = model.userId;
                    product._product = model.productId;
                    product.amount = model.amount;
                    product.quantity = quant;

                    orderService
                        .createOrder(model.product, model.userId)
                        .then(function (user) {
                            $location.url('/profile');
                        });
                }
            }
        }
function addReview(review) {
review._user=currentUser._id;
review._product=model.productId;
    reviewService
        .createReview(review, model.productId)
        .then(function (user) {
            review.text=null;
            init();
        });
}
        function updateProductLikes(product) {
            if (model.alreadyliked != 1) {
                var likes = product.likes;
                likes = likes + 1;
                product.likes = likes;
                productService
                    .updateProductLikes(product._id, product, currentUser._id)
                    .then(function () {
                        model.alreadyliked=1;
                        $location.url('/viewproduct/' + product._id);
                    })
            }
        }
    }
})();