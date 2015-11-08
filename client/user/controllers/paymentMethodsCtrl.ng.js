angular.module("food-coop").controller("UserPaymentMethodCtrl", function($scope, paymentMethods, $meteor){
  if (paymentMethods) {
    $scope.paymentMethods = angular.copy(paymentMethods)
    _.map($scope.paymentMethods, function(p) {
      p.delete = function(cb) {
        $meteor.call('deletePaymentMethod', p.token).then(cb)
        $scope.paymentMethods = _.reject($scope.paymentMethods, function(pay) {
          return pay.token === p.token;
        });
      }
      p.makeDefault = function(cb) {
        $meteor.call('makeDefaultPaymentMethod', p.token).then(cb)
      }
      return p
    });
  }

  $scope.callback = function(result) {
    if (result.token) {
      alert('Success!')
    }
  }
});
