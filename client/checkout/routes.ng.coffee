angular.module('food-coop').config ($stateProvider) ->
  $stateProvider
  .state 'checkoutSuccess',
    url: '/success'
    templateUrl: 'client/checkout/views/success.ng.html'

  .state 'profile.subscriptionCheckout',
    url: '/subscription-checkout'
    templateUrl: 'client/checkout/views/subscription-checkout.ng.html'
    controller: 'subscribeCtrl',
    resolve:
      "currentUser" : ($auth) ->
        $auth.requireUser()

  .state 'profile.subscriptionCheckout.success',
    url: '/success-subscription'
    templateUrl: 'client/checkout/views/success.ng.html'

  .state 'profile.subscriptionCheckout.failure',
    url: '/failure-subscription'
    templateUrl: 'client/checkout/views/failure.ng.html'
