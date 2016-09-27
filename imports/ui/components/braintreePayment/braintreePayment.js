// import angular from 'angular'
import ngMaterial from 'angular-material'

import templateUrl from './braintreePayment.html'
// import './style.scss'


class BraintreePaymentController {
  constructor($scope, $state, $reactive) {
    'ngInject';
    this.nonce = ""
    
    $reactive(this).attach($scope)
    
    
    this.container = "payment-form"
    this.onReady = (obj) => {
      console.log(obj)
      this.teardown = obj.teardown;
      $scope.$apply( () => { this.disablePaymentButton() })
    }
    
    this.getClientToken()
  }
  
  getClientToken() {
    this.call("generateClientToken", (err, token) => {
      if (err || !token) {
        this.error = "Sorry connection error occurred to payment provider. Please try again later";
        return console.log(err);
      }
      braintree.setup(token, "dropin", {
        container: this.container,
        onReady: this.onReady.bind(this),
        onPaymentMethodReceived: this.onPaymentMethodReceived.bind(this),
        onError: this.onError
      });
    })
  }
  
  onError(err) {
    this.error = `Error: ${err.type}: ${err.message}`
  }
  
  onPaymentMethodReceived(data) {
    this.onSuccess({data})
  }
  
  startSpinner() {
    this.spinner = true;
  }
  
  stopSpinner() {
    this.spinner = false;
  }
  
  disablePaymentButton() {
    this.disablePaymentButton = true;
  }
  
  enablePaymentButton() {
    this.disablePaymentButton = false;
  }
  

}

const name = 'braintreePayment';

// create a module
export default angular.module(name, [
  'angular-meteor',
  ngMaterial
]).component(name, {
  templateUrl,
  controller: BraintreePaymentController,
  controllerAs: name,
  bindings: {
    onSuccess: "&",
    buttonText: "@",
    isValid: "<"
  }
})