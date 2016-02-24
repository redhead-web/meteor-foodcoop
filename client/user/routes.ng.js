angular.module('food-coop').config( function($stateProvider) {
  $stateProvider
  .state('profile.edit', {
    url: '/edit',
    controller: 'EditUserCtrl',
    templateUrl: 'client/user/views/edit.ng.html'
  })
  .state('profile.balance', {
    url: '/balance',
    controller: 'UserBalanceCtrl',
    controllerAs: 'ctrl',
    templateUrl: 'client/user/views/balance.ng.html',
    resolve: {
      'subscription': function($meteor) {
        return $meteor.subscribe('myOrders')
      }
    }
  })
  .state('profile.cart', {
    url: '/cart',
    controller: 'UserCartCtrl',
    controllerAs: 'cart',
    templateUrl: 'client/user/views/cart.ng.html'
  })
  .state('profile.orders', {
    url: '/orders',
    controller: 'UserOrderCtrl',
    templateUrl: 'client/user/views/orders.ng.html'
  })
  .state('profile.sales', {
    url: '/sales',
    controller: 'UserSalesCtrl',
    templateUrl: 'client/user/views/sales.ng.html'
  })
  .state('profile.gstReceipt', {
    url: '/order/gst/:orderId',
    controller: 'gstReceiptCtrl',
    controllerAs: 'gst',
    templateUrl: 'client/user/views/gst.ng.html'
  })
  .state('profile.paymentMethods', {
    url: '/payment-methods',
    controller: 'UserPaymentMethodCtrl',
    templateUrl: 'client/user/views/payment-methods.ng.html',
    resolve: {
      paymentMethods : function($meteor) {
        return $meteor.call('findUserPaymentMethods')
      }
    }
  })
  .state('profile.cart.checkout', {
    url: '/checkout',
    templateUrl: 'client/checkout/views/checkout.ng.html',
    controller: 'checkoutCtrl',
    controllerAs: 'checkout',
    resolve: {
      "currentUser" : function($auth) {
        return $auth.requireUser();
      }
    }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'client/user/auth/views/login.ng.html',
    controller: 'LoginCtrl',
    controllerAs: 'lc'
  })
  .state('register',{
    url: '/register',
    templateUrl: 'client/user/auth/views/register.ng.html',
    controller: 'RegisterCtrl',
    controllerAs: 'rc'
  })
  .state('resetpw', {
    url: '/reset-password',
    templateUrl: 'client/user/auth/views/reset-password.ng.html',
    controller: 'ResetCtrl',
    controllerAs: 'rpc'
  })
  .state('setpw', {
    url: '/reset-password/:token',
    templateUrl: 'client/user/auth/views/set-password.ng.html',
    controller: 'ActivateCtrl',
    controllerAs: 'vm'
  })
  .state('welcome', {
    url: '/welcome',
    templateUrl: 'client/user/auth/views/welcome.ng.html'
  })
  .state('logout', {
    url: '/logout',
    resolve: {
      "logout": function($meteor, $state) {
        return $meteor.logout().then(function(){
          $state.go('store');
        }, function(err){
          console.log('logout error - ', err);
        });
      }
    }
  })
  ;
});
