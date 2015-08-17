angular.module("food-collective").controller("AdminCtrl", function($scope, $rootScope, subscribe){
  $scope.userCount = Counts.get('userCount');
  $scope.orderCount = Counts.get('orderCount');
});
