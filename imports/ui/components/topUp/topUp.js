/* eslint-env browser */
import angular from 'angular';
// import { Meteor } from 'meteor/meteor';

import templateUrl from './topUp.html';

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
                  on-success="topUpDialog.hide(data)"
                ></braintree-payment>
              </div>
            </md-dialog-content>
          </md-dialog>
        `,
        controllerAs: 'topUpDialog',
        controller() {
          this.hide = (data) => {
            $mdDialog.hide({ data, amount: this.amount });
          };
        },
      }).then((data) => {
        if (data) {
          this.handlePaymentSuccess(data);
        }
      }, () => {
        this.status = 'You decided not to to top up';
      });
    };

    this.makeToast = (message) => {
      $mdToast.show($mdToast.simple().textContent(message).hideDelay(3000));
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
  templateUrl,
  controller: topUpController,
  controllerAs: name,
});
