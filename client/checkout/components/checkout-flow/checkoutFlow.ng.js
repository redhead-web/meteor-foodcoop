function CheckoutFlowController($mdDialog) {
  "ngInject";
  let vm = this;
  vm.checkout = function(ev) {
    $mdDialog.show({
      controller: PaymentMethodSelector,
      controllerAs: '$ctrl',
      templateUrl: 'client/checkout/components/checkout-flow/payment-method-dialog.ng.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        total: vm.total
      }
    }).then( function(success) {
      if (success) {
        vm.onSuccess()
      }
    }, function() {
      vm.status = 'You cancelled the checkout flow';
    });
  }
}

angular.module("food-coop").component('checkoutFlow', {
  controller: CheckoutFlowController,
  templateUrl: 'client/checkout/components/checkout-flow/button.ng.html',
  bindings: {
    total: "<",
    customer: "<",
    pos: "@",
    onError: "&",
    onSuccess: "&"
  }
});

function PaymentMethodSelector ($scope, $mdDialog, total) {
  "ngInject";
  let vm = this;
  vm.total = total;
  vm.success = function() {
    $mdDialog.hide(true);
  };
  vm.cancel = function() {
    $mdDialog.cancel();
  };
  vm.error = function(error) { 
    console.log("error called", error.message)
    vm.errorMessage = error.message 
  };
}