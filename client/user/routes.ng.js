angular.module('food-coop').config(($stateProvider) => {
  $stateProvider
  .state('profile.edit', {
    url: '/edit',
    controller: 'EditUserCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'client/user/views/edit.ng.html',
  })
  .state('profile.balance', {
    url: '/balance',
    controller: 'UserBalanceCtrl',
    controllerAs: 'ctrl',
    templateUrl: 'client/user/views/balance.ng.html',
    resolve: {
      subscription($meteor) {
        return $meteor.subscribe('myOrders');
      },
    },
  })
  .state('profile.orders', {
    url: '/orders',
    controller: 'UserOrderCtrl',
    templateUrl: 'client/user/views/orders.ng.html',
  })
  .state('profile.sales', {
    url: '/sales',
    controller: 'UserSalesCtrl',
    controllerAs: 'sales',
    templateUrl: 'client/user/views/sales.ng.html',
  })
  .state('profile.gstReceipt', {
    url: '/order/gst/:orderId',
    controller: 'gstReceiptCtrl',
    controllerAs: 'gst',
    templateUrl: 'client/user/views/gst.ng.html',
  })
  .state('profile.paymentMethods', {
    url: '/payment-methods',
    controller: 'UserPaymentMethodCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'client/user/views/payment-methods.ng.html',
    resolve: {
      paymentMethods($meteor) {
        return $meteor.call('findUserPaymentMethods');
      },
    },
  })
  .state('login', {
    url: '/login',
    templateUrl: 'client/user/auth/views/login.ng.html',
    controller: 'LoginCtrl',
    controllerAs: 'lc',
  })
  .state('register', {
    url: '/register',
    templateUrl: 'client/user/auth/views/register.ng.html',
    controller: 'RegisterCtrl',
    controllerAs: 'rc',
  })
  .state('resetpw', {
    url: '/reset-password',
    templateUrl: 'client/user/auth/views/reset-password.ng.html',
    controller: 'ResetCtrl',
    controllerAs: 'rpc',
  })
  .state('setpw', {
    url: '/reset-password/:token',
    templateUrl: 'client/user/auth/views/set-password.ng.html',
    controller: 'ActivateCtrl',
    controllerAs: 'ctrl',
  })
  .state('invite', {
    url: '/invite/:token',
    templateUrl: 'client/user/auth/views/invite.ng.html',
    controller: 'ActivateCtrl',
    controllerAs: 'vm',
  })
  .state('welcome', {
    url: '/welcome',
    templateUrl: 'client/user/auth/views/welcome.ng.html',
  })
  .state('logout', {
    url: '/logout',
    resolve: {
      logout($meteor, $state) {
        return $meteor.logout().then(() => {
          $state.go('store');
        }, (err) => {
          console.log('logout error - ', err);
        });
      },
    },
  });
});
