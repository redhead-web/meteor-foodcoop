angular.module('food-coop').controller('CheckoutController', CheckoutController)


function CheckoutController ($mdDialog) {
  var vm = this;
  
  vm.disablePaymentButton = true;
  
  var braintreeOptions = {
    container: "payment-form",
    onReady(obj) {
      teardown = obj.teardown;
      $scope.$apply( function () { vm.disablePaymentButton = false })
    },
    onPaymentMethodReceived: checkout,
    onError: function (err) {
      vm.error = "Error: " + err.type + ": " + err.message;
    },
  };
  
  function getClientToken () {
    vm.call("generateClientToken", function(err, token) {
      if (err || !token) {
        vm.error = "Sorry connection error occurred to payment provider. Please try again later";
        return console.log(err);
      }
      braintree.setup(token, "dropin", braintreeOptions);
    })
  }
  
  getClientToken()
    
  function checkout(obj) {
    console.log('checking out')
    console.log(vm.total)
    
    console.log(obj)
    var data = {};

    data.payment_method_nonce = obj.nonce

    // start spinning wheel animation
    // $scope.$apply( function () {
//       vm.spinner = true;
//     });
//
//     vm.call('braintreeAuthorization', data, function(err, result) {
//       if (result && result.success) {
//         vm.success = true;
//       } else {
//         console.log(err);
//         // display error details to the user and get them to try again
//         vm.error = "Sorry, something went wrong, please confirm your payment details and try again."
//         teardown(function() {
//           getClientToken()
//         });
//       }
//       // end spinning wheel animation
//       vm.spinner = false;
//       $scope.$apply()
//     });

    $scope.$apply(function() {
      vm.success = true;
      
    })
  };
  
  vm.cancel = function() {
    $mdDialog.cancel();
  };
  vm.answer = function(answer) {
    $mdDialog.hide(answer);
  };
  
  ;
}