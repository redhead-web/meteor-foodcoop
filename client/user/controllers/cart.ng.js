angular.module("food-coop").controller("UserCartCtrl", function($scope, $rootScope, $meteor){
  $scope.total = 0;
  $scope.countTotal = countTotal;
  $scope.removeFromCart = removeFromCart;
  $scope.changeQuantity = changeQuantity;
  $scope.markup = Meteor.settings.public.markup / 100 + 1;

  function countTotal() {
    var start, end;
    $scope.total = _.reduce($rootScope.currentUser.profile.cart.products, function(total, item) {
      return total + (item.details.price * $scope.markup * item.qty)
    }, 0)
  }

  function removeFromCart(id) {
    $meteor.call('removeFromCart', id)
    .then(countTotal);
  }

  function changeQuantity (id, productId, new_qty, old_qty) {
    countTotal();
    $meteor.call('updateCartQty', id, productId, new_qty, old_qty)
    .then(countTotal, function(error) {
      console.log(error);
    });
  }

  countTotal();

});
