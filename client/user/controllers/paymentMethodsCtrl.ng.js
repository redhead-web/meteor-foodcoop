angular.module('food-coop').controller('UserPaymentMethodCtrl', function ($scope, $reactive, paymentMethods, $mdToast) {
  $reactive(this).attach($scope);
  if (paymentMethods) {
    this.paymentMethods = angular.copy(paymentMethods);

    _.map(this.paymentMethods, (p) => {
      p.delete = (cb) => {
        this.call('deletePaymentMethod', p.token, cb);

        this.paymentMethods = _.reject(this.paymentMethods, pay => pay.token === p.token);
      };
      p.makeDefault = (cb) => {
        this.call('makeDefaultPaymentMethod', p.token, cb);
      };
      return p;
    });
  }

  this.callback = function (result) {
    if (result.token) {
      $mdToast.show(
        $mdToast.simple().content('Success!').position('bottom right').hideDelay(4000),
      );
    }
  };
});
