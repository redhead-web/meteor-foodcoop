angular.module("food-coop").controller("orderProductCtrl", function($scope, $rootScope, $meteor, $mdDialog, $mdToast, $state){
  var vm = this;

  vm.addToCart = addToCart;

  function showLoginAlert ($event) {
    $mdDialog.show(
    $mdDialog.alert()
      .clickOutsideToClose(true)
      .title('Oops! We don\'t know who you are!')
      .content('You must be logged in to shop. Please login and then continue shopping.')
      .ariaLabel('Please login to shop')
      .ok('Got it!')
      .targetEvent($event)
    );
  }

  function showIsOwnerAlert ($event) {
    $mdToast.show(
      $mdToast.simple().content("Sorry, you can't order your own items!").position('bottom left').hideDelay(3000)
    );
  }

  function addToCart ($event, product, qty) {
    var promise;

    if (!$rootScope.currentUser) {
      return showLoginAlert($event)
    }

    if ($rootScope.currentUser._id === product.producer) {

    }


    promise = $meteor.call('addToCart', product, qty)

    promise.then(function(success) {
      console.log('success!')
      var toast = $mdToast.simple()
          .content('Poof! Added to Cart! Ready to Checkout?')
          .action('OK')
          .highlightAction(false)
          .position('bottom left');
      $mdToast.show(toast).then(function(response) {
        if ( response == 'ok' ) {
          $state.go('profile.cart.checkout');
        }
      });

    }, function (error) {
      console.log(error);
      $mdToast.show(
        $mdToast.simple().content("Sorry, something went wrong!").position('bottom left').hideDelay(3000)
      );
    })
  }
  return vm;

});
