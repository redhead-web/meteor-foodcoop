angular.module("food-coop").controller("checkoutCtrl", function($scope, $rootScope, $meteor, $state, currentUser, token){
  var nonce = ""
  //Meteor.users.update({_id: Meteor.user()._id}, {$set: {'profile.cart.status':'pending'}}, {validate: false})
  $scope.total = 0;
  $scope.markup = Meteor.settings.public.markup / 100 + 1;

  braintree.setup(token, "dropin", {
    container: "payment-form",
    onPaymentMethodReceived: checkout
  });

  function checkout (obj) {
    var data = {}, confirm;

    data.payment_method_nonce = nonce = obj.nonce

    data.total = countTotal();
    // start spinning wheel animation
    $scope.spinner = true;
    $meteor.call('braintreeTransaction', data).then(function(result) {
      if (result.success) {
        $state.go('profile.cart.success')
      } else {
        console.log(result);
        // display error details to the user and get them to try again
      }
      // end spinning wheel animation
      $scope.spinner = false;
    })
  }


  function countTotal() {
    $scope.total = _.reduce($rootScope.currentUser.profile.cart.products, function(total, item) {
      return total + (item.details.price * $scope.markup * item.qty)
    }, 0);
    return $scope.total;
  }

  countTotal();



});
