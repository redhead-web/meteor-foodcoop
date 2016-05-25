function BraintreeCheckoutController($scope, $reactive, $state) {
  "ngInject";
  $reactive(this).attach($scope)

  let vm = this;
  let nonce = ""
  let teardown;
  const braintreeTransactionMethod = 'braintreeTransaction' // should default from template to 'braintreeTransaction' 

  let braintreeOptions = {
    container: "payment-form",
    onReady(obj) {
      teardown = obj.teardown;
      $scope.$apply( function () { vm.disablePaymentButton = false })
      //vm.disablePaymentButton = false
    },
    onPaymentMethodReceived: checkout,
    onError(err) {
      vm.onError({error: {message: `Error: ${err.type}: ${err.message}`}});
    },
  };

  vm.disablePaymentButton = true;

  getClientToken()
  
  function getClientToken () {
    vm.call("generateClientToken", function(err, token) {
      if (err || !token) {
        vm.onError({error: {message: "Sorry connection error occurred to payment provider. Please try again later"}});
        return console.log(err);
      }
      braintree.setup(token, "dropin", braintreeOptions);
    })
  }

  function checkout (obj) {
    console.log(obj)
    let data = {}
    data.payment_method_nonce = obj.nonce;

    // start spinning wheel animation
    $scope.$apply( function () {
      vm.spinner = true;
      vm.disablePaymentButton = true;
    });
  
    //vm.spinner = true;
  
    vm.call(braintreeTransactionMethod, data, function(err, result) {
      if (result && result.success) {
        vm.onSuccess();
      } else {
        console.log(err);
        // display error details to the user and get them to try again
        vm.onError({error: {message: "Sorry, something went wrong, please confirm your payment details and try again."}}); 
        teardown(function() {
          getClientToken();
          vm.disablePaymentButton = false;
        });
      }
      // end spinning wheel animation
      vm.spinner = false;
    });
  }
}

angular.module("food-coop").component("cardPayment", {
  controller: BraintreeCheckoutController,
  controllerAs: 'checkout',
  templateUrl: "client/checkout/components/card-payment.ng.html",
  bindings: {
    onSuccess: "&",
    onError: "&",
    data: "<" // data to determine what type of transaction this is
  }
}); 