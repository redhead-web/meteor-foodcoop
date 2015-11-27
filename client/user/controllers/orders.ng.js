angular.module("food-coop").controller("UserOrderCtrl", function($scope, $mdDialog, $meteor){

  $scope.deliveryDay = moment( GetDeliveryDay() ).format();

  $meteor.autorun($scope, function() {
    $meteor.subscribe('myPurchases', $scope.getReactively('deliveryDay'))
  });

  $scope.markup = Meteor.settings.public.markup / 100 +1;

  $scope.orders = $scope.$meteorCollection(Sales);

  $scope.forward = forward;

  $scope.backward = backward;

  $scope.total = total;

  function total(array) {
    return _.reduce(array, function(total, order) {
      return total + (order.price * order.qty * $scope.markup);
    }, 0)
  }

  function forward() {
    $scope.deliveryDay = moment( $scope.deliveryDay ).add(1, 'weeks').format();
  }

  function backward() {
    $scope.deliveryDay = moment( $scope.deliveryDay ).subtract(1, 'weeks').format();
  }

});
