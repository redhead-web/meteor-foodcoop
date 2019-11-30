/* eslint-env browser */
import angular from 'angular';
// import { Meteor } from 'meteor/meteor';

import template from './topUp.html';

class topUpController {
  constructor($mdDialog, $mdToast, $reactive, $scope) {
    'ngInject';

    $reactive(this).attach($scope);

    this.handleTopUpStart = (ev) => {
      $mdDialog.show({
        // contentElement: '#topUpForm',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        template: `
          <md-dialog>
            <md-dialog-content>
              <div class="md-dialog-content">
                <md-input-container class="md-block">
                  <label>How much would you like to top up?</label>
                  <md-select ng-model="topUpDialog.amount">
                    <md-option ng-value="{{50}}">$50</md-option>
                    <md-option ng-value="{{80}}">$80</md-option>
                    <md-option ng-value="{{100}}">$100</md-option>
                    <md-option ng-value="{{150}}">$150</md-option>
                    <md-option ng-value="{{200}}">$200</md-option>
                  </md-select>
                </md-input-container>
                <braintree-payment
                  is-valid="topUpDialog.amount"
                  button-text="Add Credit to my account"
                  on-success="topUpDialog.handlePaymentSuccess(data)"
                ></braintree-payment>
              </div>
            </md-dialog-content>
          </md-dialog>
        `,
        controllerAs: 'topUpDialog',
        controller($scope) { // eslint-disable-line

          'ngInject';

          $reactive(this).attach($scope);
          this.hide = (data) => {
            $mdDialog.hide({ data, amount: this.amount });
          };
          this.handlePaymentSuccess = (data) => {
            this.call('Accounts.topUp', { data, amount: this.amount }, (err, result) => {
              if (err) {
                $mdDialog.cancel(err);
              }
              this.hide(result);
            });
          };
        },
      }).then(() => {
        this.makeToast('Thanks! Top up Successful.');
      }, (err) => {
        this.makeToast(err.message);
      });
    };

    this.makeToast = (message) => {
      $mdToast.show($mdToast.simple().textContent(message).hideDelay(3000).position('bottom right'));
    };
  }
  handlePaymentSuccess(data) {
    this.call('Accounts.topUp', data, (err) => {
      const message = err ? err.message : 'Thanks! Top up Successful.';
      this.makeToast(message);
    });
  }
}

export const name = 'topUp';

export default angular.module(name, []).component(name, {
  template,
  controller: topUpController,
  controllerAs: name,
});
