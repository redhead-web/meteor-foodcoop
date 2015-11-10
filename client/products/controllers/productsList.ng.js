angular.module("food-coop").controller("ProductsListCtrl", function($scope, $rootScope, $meteor, $mdDialog, $mdToast, $state){

  $scope.products = $scope.$meteorCollection(Products);
  $scope.remove = function(product){
    $scope.products.remove(product);
  };
  $scope.removeAll = function(){
    $scope.products.remove();
  };

  $scope.addToCart = addToCart;

  function showAlert ($event) {
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

  function addToCart ($event, product, qty) {
    var promise;

    if (!$rootScope.currentUser) {
      return showAlert($event)
    }

    promise = $meteor.call('addToCart', product, qty, start_date, end_date)

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
