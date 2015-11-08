angular.module("food-coop").controller("ProductsListCtrl", function($scope, $rootScope, $meteor, $mdDialog, $mdToast, $state){

  $scope.products = $scope.$meteorCollection(Products);
  $scope.remove = function(product){
    $scope.products.remove(product);
  };
  $scope.removeAll = function(){
    $scope.products.remove();
  };

  $scope.showDialog = showDialog;

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

  function showDialog ($event, product) {
    if ($rootScope.currentUser) {
      $mdDialog.show({
        targetEvent: $event,
        templateUrl: 'client/products/views/product-purchase.ng.html',
        locals: {product: product},
        controller: DialogCtrl
      });
    } else {
      showAlert($event)
    }

  }

  function DialogCtrl ($scope, $mdDialog, product) {
    $scope.product = product;
    $scope.addToCart = addToCart;
    $scope.createAP = createAP;
    $scope.continuousOrder = continuousOrder;

    $scope.step = 0

    $scope.order = {}

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }

  function addToCart (product, qty, duration) {
    var start_date, end_date, promise;
    start_date = new Date();

    if (duration !== 'INDEFINATE') {
      end_date = moment(start_date).add(duration).toDate();
    }

    promise = $meteor.call('addToCart', product, qty, start_date, end_date)

    $mdDialog.hide();

    promise.then(function(success) {
      console.log('success!')
      var toast = $mdToast.simple()
          .content('Added to Cart! Ready to Checkout?')
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
        $mdToast.simple().content("Sorry, that didn't work!").position('bottom left').hideDelay(3000)
      );
    })
  }

  function createAP (product, qty, duration) {
    var order, start_date, promise;
    start_date = new Date();
    order = {
      status: 'active',
      productId: product._id,
      productDetails: {
        name: product.name,
        description: product.description,
        price: product.price,
        img: product.img,
        thumb:product.thumb,
      },
      qty: qty,
      start_date: start_date,
      user: $rootScope.currentUser._id,
      ap:true
    };

    if (duration !== 'INDEFINATE') {
      order.end_date = moment(start_date).add(duration).toDate();
    } else {
      order.continuous = true
    }
    console.log(order);
    Subscriptions.insert(order, function(err) {
      if (err) {
        $mdToast.show(
          $mdToast.simple().content("Sorry, something went wrong!").position('bottom left').hideDelay(3000)
        );
      }
    });

    $mdDialog.hide();
    $state.go("profile.subscriptions");
  }

  function continuousOrder (product, qty, duration) {
    if (duration === 'continuous') {
      $rootScope.subscription = {
        productId: product._id,
        productDetails: {
          name: product.name,
          price: product.price,
          description: product.description,
          img: product.img,
          thumb:product.thumb,
        },
        qty: qty,
        start_date: new Date(),
        continuous: true,
        user: $rootScope.currentUser._id
      };
      $mdDialog.hide();
      $state.go('profile.subscriptionCheckout');

    } else $mdToast.show($mdToast.simple().content("Sorry, something went wrong!").position('bottom left').hideDelay(3000));

  }

});
