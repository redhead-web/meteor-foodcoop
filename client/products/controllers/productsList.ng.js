angular.module("food-collective").controller("ProductsListCtrl", function($scope, $rootScope, $meteor, $mdDialog, $state){

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


  function showDialog ($event, product) {
    $mdDialog.show({
      targetEvent: $event,
      templateUrl: 'client/products/views/product-purchase.ng.html',
      locals: {product: product},
      controller: DialogCtrl
    })
  }

  function showConfirm (ev, product) {
    var total = 0.45 + (product.price * 50/12 * 1.029)
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
  }

  function DialogCtrl ($scope, $mdDialog, product) {
    $scope.product = product;
    $scope.addToCart = addToCart;

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
      end_date = moment(start_date).add(duration).format();
    }

    promise = $meteor.call('addToCart', product, qty, start_date, end_date)

    $mdDialog.hide();

    promise.then(function(success) {
      console.log('success!')
    }, function (error) {
      console.log(error);
    })
  }

});
