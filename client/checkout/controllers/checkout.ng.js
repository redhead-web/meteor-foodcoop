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
    },
    onPaymentMethodReceived: checkout,
    onError(err) {
      vm.error = `Error: ${err.type}: ${err.message}`
    },
  };
  const MARKUP = Meteor.settings.public.markup / 100 + 1;
  vm.disablePaymentButton = true;
  
  function getClientToken () {
    Meteor.call("generateClientToken", function(err, token) {
      if (err || !token) {
        vm.error = "Sorry connection error occurred to payment provider. Please try again later";
        return console.log(err);
      }
      braintree.setup(token, "dropin", braintreeOptions);
    })
  }
  
  getClientToken()
  

  vm.helpers({
    total() {
      let user = Meteor.user();
      let items = Cart.Items.find().fetch();
      let total = _.reduce(items, (total, item) => {
        return total + (item.details.price * MARKUP * item.qty)
      }, 0);
      if (user.profile.balance > 0) {
        if (user.profile.balance < total) {
          return total - user.profile.balance;
        } else return 0
      }
      return total;
    }
  })

  

  function checkout (obj) {
    console.log(obj)
    let data = {};

    data.payment_method_nonce = obj.nonce

    // start spinning wheel animation
    $scope.$apply( function () { 
      vm.spinner = true;
    });
    
    Meteor.call('braintreeTransaction', data, function(err, result) {
      if (result && result.success) {
        $state.go('profile.cart.success')
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
      $scope.$apply()
    });
  }



});
