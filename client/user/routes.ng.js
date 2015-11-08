angular.module('food-coop').config( function($stateProvider) {
  $stateProvider
  .state('profile.edit', {
    url: '/edit',
    controller: 'EditUserCtrl',
    templateUrl: 'client/user/views/edit.ng.html'
  })
  .state('profile.cart', {
    url: '/cart',
    controller: 'UserCartCtrl',
    templateUrl: 'client/user/views/cart.ng.html'
  })
  .state('profile.subscriptions', {
    url: '/subscriptions',
    controller: 'UserSubscriptionCtrl',
    templateUrl: 'client/user/views/subscriptions.ng.html'
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
    resolve: {
      "currentUser" : function($meteor) {
        return $meteor.requireUser();
      },
      "token" : function($meteor, $rootScope) {
        return $meteor.call('generateClientToken');
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
    url: '/resetpw',
    templateUrl: 'client/user/auth/views/reset-password.ng.html',
    controller: 'ResetCtrl',
    controllerAs: 'rpc'
  })
  .state('setpw', {
    url: '/resetpw/:token',
    templateUrl: 'client/user/auth/views/set-password.ng.html',
    controller: 'ActivateCtrl',
    controllerAs: 'vm'
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
