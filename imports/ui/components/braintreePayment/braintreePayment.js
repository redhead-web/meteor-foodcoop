/* globals braintree */
import angular from 'angular';
import { Meteor } from 'meteor/meteor';

import template from './braintreePayment.html';
// import './style.scss'


class BraintreePaymentController {
  constructor($scope, $state, $reactive) {
    'ngInject';

    this.nonce = '';
    this.spinner = true;

    $reactive(this).attach($scope);
    this.disablePaymentButton = true;

    this.container = 'payment-form';
    this.onReady = (obj) => {
      this.spinner = false;
      console.log(obj);
      this.teardown = obj.teardown;
      $scope.$apply(() => { this.enablePaymentButton(); });
    };

    this.getClientToken();
  }

  getClientToken() {
    this.call('generateClientToken', this.customerId || Meteor.userId(), (err, token) => {
      if (err || !token) {
        this.error = 'Sorry connection error occurred to payment provider. Please try again later';
        return console.log(err);
      }
      return braintree.setup(token, 'dropin', {
        container: this.container,
        onReady: this.onReady.bind(this),
        onPaymentMethodReceived: this.onPaymentMethodReceived.bind(this),
        onError: this.onError,
      });
    });
  }

  onError(err) {
    this.error = `Error: ${err.type}: ${err.message}`;
  }

  onPaymentMethodReceived(data) {
    this.onSuccess({ data });
  }

  startSpinner() {
    this.spinner = true;
  }

  stopSpinner() {
    this.spinner = false;
  }

  enablePaymentButton() {
    this.disablePaymentButton = false;
  }

  disablePaymentButton() {
    this.disablePaymentButton = true;
  }
}

export const name = 'braintreePayment';

// create a module
export default angular.module(name, []).component(name, {
  template,
  controller: BraintreePaymentController,
  controllerAs: name,
  bindings: {
    onSuccess: '&',
    buttonText: '@',
    isValid: '<',
    customerId: '<',
    fees: '<',
    showFees: '<',
  },
});
