angular.module("food-collective").controller("AdminCtrl", function($scope, $rootScope, admin, userCount, orderCount){
  $scope.userCount = Counts.get('userCount');
  $scope.ordersCount = Counts.get('upcoming-ordersCount');
  $scope.productsCount = Counts.get('product-count');
});
