angular.module("food-collective").controller("ProductsListCtrl", function($scope, $rootScope, $meteor, $mdDialog, $mdToast, $state){

  $scope.products = $scope.$meteorCollection(Products);
  $scope.remove = function(product){
    $scope.products.remove(product);
  };
  $scope.removeAll = function(){
    $scope.products.remove();
  };

  $scope.showDialog = showDialog;
  //$scope.addToCart = addToCart;
  $scope.showConfirm = showConfirm;

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

  function showConfirm (ev, product) {
    var total = 0.45 + (product.price * 50/12 * 1.029)
    if ($rootScope.currentUser) {
      $mdDialog.show({
        targetEvent: ev,
        templateUrl: 'client/products/views/subscription-info.ng.html',
        locals: {product: product, total: total},
        controller: confirmSubscribeCtrl
      }).then(function(answer) {
        if (answer === "YES")  {
          $rootScope.subscription = {
            productId: product._id,
            productDetails: {
              name: product.name,
              price: product.price,
              thumb: product.thumb,
              description: product.description
            },
            qty: 1,
            start_date: new Date(),
            indefinate: true,
            user: $rootScope.currentUser._id
          }
          $state.go('profile.subscriptionCheckout')
        }
      })
    } else {
      showAlert(ev)
    }
  }

  function DialogCtrl ($scope, $mdDialog, product) {
    $scope.product = product;
    $scope.addToCart = addToCart;
    $scope.createAP = createAP;

    $scope.step = 0

    $scope.order = {}

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }

  function confirmSubscribeCtrl ($scope, $mdDialog, product, total) {
    $scope.product = product;
    $scope.total = total;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
    $mdDialog.hide(answer);
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
        price: product.price
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
    $state.go("profile.subscriptions")
  }

});
