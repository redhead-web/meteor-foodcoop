angular.module("food-collective").controller("ProductsListCtrl", function($scope, $meteor){
  $scope.products = $scope.$meteorCollection(Products);
  $scope.remove = function(product){
    $scope.products.remove(product);
  };
  $scope.removeAll = function(){
    $scope.products.remove();
  };

  $scope.addToCart = addToCart;

  function addToCart (product, qty, duration) {
    var start_date, end_date;
    start_date = new Date();

    if (duration !== 'INDEFINATE') {
      end_date = moment(start_date).add(duration).format();
    }

    $meteor.call('addToCart', product, qty, start_date, end_date).then(function(success) {
      console.log('success!')
    }, function (error) {
      console.log(error);
    })
  }

});
