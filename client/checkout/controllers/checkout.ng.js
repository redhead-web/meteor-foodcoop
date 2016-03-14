angular.module("food-coop").controller("checkoutCtrl", function($scope, $reactive, $state, currentUser){
  $reactive(this).attach($scope)
  
  let vm = this;
  let nonce = ""
  let teardown;
  
  let braintreeOptions = {
    container: "payment-form",
    onReady(obj) {
      teardown = obj.teardown;
      $scope.$apply( function () { vm.disablePaymentButton = false })
      //vm.disablePaymentButton = false
    },
    onPaymentMethodReceived: checkout,
    onError(err) {
      vm.error = `Error: ${err.type}: ${err.message}`
    },
  };
  
  vm.disablePaymentButton = true;
  
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

  vm.autorun(() => {
    let user = Meteor.user();
    let items = Cart.Items.find().fetch();
    let total = Markup(items).cartTotal();
    
    if (user.profile.balance > 0) {
      if (user.profile.balance < total) {
        vm.total = total - user.profile.balance;
      } else vm.total = 0
    } else vm.total = total
  })

  

  function checkout (obj) {
    console.log(obj)
    let data = {};

    data.payment_method_nonce = obj.nonce

    // start spinning wheel animation
    $scope.$apply( function () {
      vm.spinner = true;
    });
    
    //vm.spinner = true;
    
    vm.call('braintreeTransaction', data, function(err, result) {
      if (result && result.success) {
        $state.go('cart.success')
      } else {
        console.log(err);
        // display error details to the user and get them to try again
        vm.error = "Sorry, something went wrong, please confirm your payment details and try again."
        teardown(function() {
          getClientToken()
        });
      }
      // end spinning wheel animation
      vm.spinner = false;
      //$scope.$apply()
    });
  }



});
