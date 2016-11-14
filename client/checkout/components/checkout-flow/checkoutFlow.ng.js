function PaymentMethodSelector($scope, $mdDialog) {
  'ngInject';
  this.success = (data) => {
    $mdDialog.hide(data);
  };
  this.cancel = () => {
    $mdDialog.cancel();
  };
  this.error = (error) => {
    console.log('error called', error.message);
    this.errorMessage = error.message;
  };
}

function CheckoutFlowController($mdDialog) {
  'ngInject';
  this.checkout = (ev) => {
    $mdDialog.show({
      controller: PaymentMethodSelector,
      controllerAs: '$ctrl',
      templateUrl: 'client/checkout/components/checkout-flow/payment-method-dialog.ng.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        total: this.total,
      },
      bindToController: true,
    }).then((data) => {
      if (data) {
        this.onSuccess({ data });
      }
    }, () => {
      this.status = 'You cancelled the checkout flow';
    });
  };
}

angular.module('food-coop').component('checkoutFlow', {
  controller: CheckoutFlowController,
  templateUrl: 'client/checkout/components/checkout-flow/button.ng.html',
  bindings: {
    total: '<',
    customer: '<',
    pos: '@',
    onError: '&',
    onSuccess: '&',
    buttonText: '@',
    buttonClass: '@',
    data: '<', // extra data to go to checkout
  },
});
