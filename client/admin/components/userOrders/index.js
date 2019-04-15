/* globals Orders */
import angular from 'angular';

angular.module('food-coop').controller('UserOrdersAdminCtrl', function userOrdersAdminCtrl($scope, $rootScope, $reactive, $state, $stateParams) {
  'ngInject';

  $reactive(this).attach($scope);
  this.subscribe('userOrders', () => [$stateParams.userId]);

  this.call('getBasicUser', $stateParams.userId, (err, result) => { this.user = result; });

  this.helpers({
    orders() {
      if (this.hidePurchases) {
        return Orders.find({ user: $stateParams.userId, status: { $in: ['credited', 'debited'] } }, { sort: { dateCreated: -1 } });
      }
      return Orders.find({ user: $stateParams.userId }, { sort: { dateCreated: -1 } });
    },
  });

  this.goTo = id => $state.go('admin.order', { orderId: id });
});
