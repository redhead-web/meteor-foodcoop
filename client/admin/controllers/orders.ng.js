angular.module("food-collective").controller("OrderAdminCtrl", function($scope, $rootScope, $meteor){

  $scope.orders = $scope.$meteorCollection('Subscriptions', false).subscribe('orders')


});
