angular.module("food-coop").controller("checkoutCtrl", function($scope, $reactive, $state, currentUser){
  $reactive(this).attach($scope)
  let vm = this;
  let nonce = ""
  const MARKUP = Meteor.settings.public.markup / 100 + 1;
  
  Meteor.call("generateClientToken", function(err, token) {
    if (err) {
      return (err)
    }
    braintree.setup(token, "dropin", {
      container: "payment-form",
      onPaymentMethodReceived: checkout
    });
  })

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
    //eWay
    // let creditCard = {
//       cardHolderName: vm.card.name,
//       cvc: eCrypt.encryptValue(vm.card.cvc, Meteor.settings.public.ewayEncryptKey),
//       cardNumber: eCrypt.encryptValue(vm.card.cardNumber, Meteor.settings.public.ewayEncryptKey),
//       expiryMonth: vm.card.month,
//       expirtyYear: vm.card.year
//     };
    var data = {}, confirm;

    data.payment_method_nonce = nonce = obj.nonce

    // data.total = vm.total;
    // start spinning wheel animation
    vm.spinner = true;
    Meteor.call('braintreeTransaction', data, function(err, result) {
      if (result.success) {
        $state.go('profile.cart.success')
      } else {
        console.log(err);
        // display error details to the user and get them to try again
      }
      // end spinning wheel animation
      vm.spinner = false;
    })
  }



});
