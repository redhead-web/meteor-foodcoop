angular.module("food-coop").controller("ProductCreateCtrl", function($scope, $rootScope){
  $scope.product = {
    producer: $rootScope.currentUser._id,
    producerName: $rootScope.currentUser.profile.name,
    producerCompanyName: $rootScope.currentUser.profile.companyName || undefined
  };

  $scope.products = $scope.$meteorCollection(Products);

  $scope.save = function() {
    if (!$scope.product.hasOwnProperty('_id')) {
      $scope.products.save($scope.product);
    }
  };
});
