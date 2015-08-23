angular.module('food-collective').config( function($stateProvider) {
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
        var customerId;
        if ($rootScope.currentUser.profile.customerId !== undefined) {
          customerId = $rootScope.currentUser.profile.customerId;
        }
        //customerId = '60980163';

        return $meteor.call('generateClientToken', customerId);
      }
    }
  });
});
