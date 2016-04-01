angular.module('food-coop')
.directive("fcBalancePayment", function() {
  return {
    restrict: 'E',
    // transclude: true,
    scope: {
      total:'=total'
    },
    controller: function($scope, $state) {
      
      "ngInject";
      
      $scope.$watch('total', function(newValue) {
        if ( Roles.userIsInRole(Meteor.userId(), 'allowNegativeBalance') || newValue === 0) {
          $scope.canInvoice = true;
        } else $scope.canInvoice = false;
      })
      
      $scope.invoice = function () {
        Meteor.call("balanceCheckout", function(err, response) {
          $scope.$apply(function() {
            if (err) {
              return console.error(err)
            }
            console.log(response)
            $state.go('cart.success')
          })
        });
      }
    },
    // replace: true,
    templateUrl: 'client/checkout/components/balancePaymentTpl.ng.html'
  }
})
