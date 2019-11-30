import angular from 'angular';
import template from './balancePaymentTpl.ng.html';


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
    template,
    controller: BalancePaymentController,
    bindings: {
      customerId: '<',
      delivery: '<',
      status: '@',
      onError: '&',
      onSuccess: '&',
    },
  });
