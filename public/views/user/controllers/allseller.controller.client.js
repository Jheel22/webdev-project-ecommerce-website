(function () {
    angular
        .module('ECOM')
        .controller('allSellerController', allSellerController);

    function allSellerController($location,
                               currentUser,
                               userService) {

        var model = this;
        model.userId = currentUser._id;
        model.user=currentUser;
        model.updateFollowers = updateFollowers;
        model.logout = logout;
        model.alreadyFollowed=0;
        function init() {
            renderUser(currentUser);
            if(currentUser.role==='CUSTOMER') {
                userService
                    .findAllSellers()
                    .then(renderSellers);
            }
            else
            {
                userService
                    .findAllCustomers()
                    .then(renderSellers);
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

        function updateFollowers(seller) {
            var following=currentUser.noOfFollowers;
            following=following+1;
            if (!(seller.listOfFollowers.indexOf(model.userId)>- 1)) {
                var follows = seller.noOfFollowers;
                follows = follows + 1;
                seller.noOfFollowers = follows;
                userService
                    .updateUserFollowers(seller._id, seller, currentUser._id,following)
                    .then(function () {
                        model.alreadyFollowed = 1;
                        $location.url('/allsellers/');
                    })
            }
        }

        function renderUser(user) {
            model.user = user;
        }
        function renderSellers(sellers) {

            model.sellers = sellers;
        }
    }
})();