function AdminBraintreeCheckoutController($scope, $reactive, $mdToast) {
  'ngInject';

  $reactive(this).attach($scope);

  const vm = this;
  const nonce = '';
  let teardown;

  const braintreeOptions = {
    container: 'payment-form',
    onReady(obj) {
      teardown = obj.teardown;
      $scope.$apply(() => { vm.disablePaymentButton = false; });
      // vm.disablePaymentButton = false
    },
    onPaymentMethodReceived: checkout,
    onError(err) {
      vm.error = `Error: ${err.type}: ${err.message}`;
    },
  };

  vm.disablePaymentButton = true;

  function getClientToken() {
    vm.call('/admin/generateClientToken', vm.customer._id, (err, token) => {
      if (err || !token) {
        vm.error = 'Sorry connection error occurred to payment provider. Please try again later';
        return console.log(err);
      }
      braintree.setup(token, 'dropin', braintreeOptions);
    });
  }

  getClientToken();

  vm.autorun(() => {
    const items = Cart.Items.find({ userId: vm.customer._id }).fetch();
    const total = Markup(items).cartTotal();

    if (vm.customer && vm.customer.profile && vm.customer.profile.balance > 0) {
      if (vm.customer.profile.balance < total) {
        vm.total = total - vm.customer.profile.balance;
      } else vm.total = 0;
    } else vm.total = total;
  });


  function checkout(obj) {
    console.log(obj);
    const data = {};

    data.payment_method_nonce = obj.nonce;
    data.deliveryDay = GetProductDeliveryDay(0).toDate();

    // start spinning wheel animation
    $scope.$apply(() => {
      vm.spinner = true;
      vm.disablePaymentButton = true;
    });

    // vm.spinner = true;

    vm.call('/admin/braintreeTransaction', vm.customer._id, data, (err, result) => {
      if (result && result.success) {
        $mdToast.show($mdToast.simple().content('Card Payment handled. Well done!').position('bottom left').hideDelay(4000));
        vm.onSuccess();
      } else {
        console.log(err);
        // display error details to the user and get them to try again
        vm.error = 'Sorry, something went wrong, please confirm your payment details and try again.';
        teardown(() => {
          getClientToken();
          vm.disablePaymentButton = false;
        });
      }
      // end spinning wheel animation
      vm.spinner = false;
      // $scope.$apply()
    });
  }
}


angular.module('food-coop').component('adminBraintreeCheckout', {
  controller: AdminBraintreeCheckoutController,
  controllerAs: 'checkout',
  templateUrl: 'client/checkout/views/checkout.ng.html',
  bindings: {
    customer: '<',
    onSuccess: '&',
  },
});
