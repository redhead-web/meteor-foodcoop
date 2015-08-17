angular.module("food-collective").controller("OrderAdminCtrl", function($scope, $rootScope, $meteor){


  $scope.users = $scope.$meteorCollection('Subscriptions', false).subscribe('orders')
  .then(refreshOrders, function(err) {
    console.log(err);
  });

});




});
