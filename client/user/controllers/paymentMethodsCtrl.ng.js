angular.module("food-coop").controller("UserPaymentMethodCtrl", function($scope, paymentMethods, $mdToast){
  if (paymentMethods) {
    
    $scope.paymentMethods = angular.copy(paymentMethods)
    
    _.map($scope.paymentMethods, function(p) {
      p.delete = function(cb) {
        $scope.call('deletePaymentMethod', p.token, cb)
        
        $scope.paymentMethods = _.reject($scope.paymentMethods, function(pay) {
          return pay.token === p.token;
        });
      }
      p.makeDefault = function(cb) {
        $scope.call('makeDefaultPaymentMethod', p.token, cb)
      }
      return p
    });
  }

  $scope.callback = function(result) {
    if (result.token) {
      $mdToast.show(
        $mdToast.simple().content("Success!").position('bottom left').hideDelay(4000)
      )
    }
  }
});
