import angular from 'angular';

class BalancePaymentController {
  constructor($scope, $state, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);
  }
  invoice() {
    this.call('balanceCheckout', this.customerId, this.delivery, this.status, (err, response) => {
      if (err) {
        this.onError({ error: err });
        console.error(err);
      } else {
        console.log(response);
        this.onSuccess({ response });
      }
    });
  }
}


angular.module('food-coop')
.component('fcBalancePayment', {
  templateUrl: 'client/checkout/components/balancePaymentTpl.ng.html',
  controller: BalancePaymentController,
  bindings: {
    customerId: '<',
    delivery: '<',
    status: '@',
    onError: '&',
    onSuccess: '&',
  },
});
