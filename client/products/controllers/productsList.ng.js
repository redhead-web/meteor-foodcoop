angular.module("food-collective").controller("ProductsListCtrl", function($scope, $meteor, $mdDialog){
  $scope.products = $scope.$meteorCollection(Products).subscribe('products');
  $scope.remove = function(product){
    $scope.products.remove(product);
  };
  $scope.removeAll = function(){
    $scope.products.remove();
  };

  $scope.showDialog = showDialog;
  //$scope.addToCart = addToCart;

  function showDialog ($event, product) {
    $mdDialog.show({
      targetEvent: $event,
      templateUrl: 'client/products/views/product-purchase.ng.html',
      locals: {product: product},
      controller: DialogCtrl
    })
  }

  function DialogCtrl ($scope, $mdDialog, product) {
    $scope.product = product;
    $scope.addToCart = addToCart;
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
