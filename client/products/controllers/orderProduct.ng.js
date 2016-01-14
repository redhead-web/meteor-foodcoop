angular.module("food-coop").controller("orderProductCtrl", function($scope, $mdDialog, $mdToast, $state){
  var vm = this;

  vm.addToCart = addToCart;

  function showLoginAlert ($event) {
    $mdDialog.show(
      $mdDialog.alert()
      .title("Login or Sign up")
      .textContent("Kaikohe Co-operative services are only available to members. Please login or sign up to shop with us.")
      .ok('Got it!')
      .targetEvent($event)
    );
  }

  function isOwnerAlert ($event) {
    $mdToast.show(
      $mdToast.simple().content("Sorry, you can't order your own items!").position('bottom left').hideDelay(3000)
    );
  }

  function addToCart ($event, product, qty) {
    var rawProduct;

    console.log('addToCart function called')

    if (typeof product.getRawObject === 'function') {
      rawProduct = product.getRawObject();
    } else rawProduct = product;

    if (!Meteor.userId()) {
      return showLoginAlert($event)
    }

    if (Meteor.userId() === product.producer) {
      return isOwnerAlert($event);
    }


    Meteor.call('addToCart', rawProduct, qty, function(err, success) {
      if (err) {
        console.log(err);
        return $mdToast.show(
          $mdToast.simple().content(err.message).position('bottom left').hideDelay(4000)
        );
      }
      console.log('success!')
      var toast = $mdToast.simple()
          .content('Poof! Added to Cart! Ready to Checkout?')
          .action('YES')
          .highlightAction(false)
          .position('bottom left');
      $mdToast.show(toast).then(function(response) {
        if ( response == 'ok' ) {
          $state.go('profile.cart.checkout');
        }
      });
    });
  }
  return vm;

});
