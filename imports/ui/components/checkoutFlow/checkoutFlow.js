/* eslint-env browser */
import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import template from './button.ng.html';
import dialogTemplate from './payment-method-dialog.ng.html';

function PaymentMethodSelector($scope, $mdDialog, $reactive, $state) {
  'ngInject';

  $reactive(this).attach($scope);
  this.success = (data) => {
    if (data && data.nonce) {
      const deliveryData = this.delivery;
      if (deliveryData && deliveryData.deliveryMethod && deliveryData.deliveryMethod.$$hashKey) {
        delete deliveryData.deliveryMethod.$$hashKey;
        delete deliveryData.deliveryMethod.$$mdSelectId;
      }
      this.call('checkoutItems', data,
      deliveryData, Meteor.userId(), 'undelivered',
      (err, success) => {
        if (success) {
          $mdDialog.hide(success);
        } else {
          this.error(err);
        }
      });
    } else {
      $mdDialog.hide();
      $state.go('checkoutSuccess');
    }
  };
  this.cancel = (err) => {
    $mdDialog.cancel(err);
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
      template: dialogTemplate,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        total: this.total,
        showFees: this.showFees,
        fees: this.fees,
        customer: this.customer,
        delivery: this.delivery,
        displayTotal: this.displayTotal,
      },
      bindToController: true,
    }).then((data) => {
      if (data) {
        this.onSuccess({ data });
      } else {
        this.onSuccess();
      }
    }, () => {
      this.status = 'You cancelled the checkout flow';
    });
  };
}

export const name = 'checkoutFlow';

export default angular.module(name, []).component(name, {
  controller: CheckoutFlowController,
  template,
  bindings: {
    total: '<',
    fees: '<',
    showFees: '<',
    customer: '<',
    delivery: '<',
    disabled: '<',
    pos: '@',
    onError: '&',
    onSuccess: '&',
    buttonText: '@',
    buttonClass: '@',
    displayTotal: '@',
    data: '<', // extra data to go to checkout
  },
});
