angular.module('food-coop').config ($stateProvider) ->
  $stateProvider
  .state 'profile.cart.success',
    url: '/success'
    templateUrl: 'client/checkout/views/success.ng.html'

  .state 'profile.cart.failure',
    url: '/failure'
    templateUrl: 'client/checkout/views/failure.ng.html'

  .state 'profile.subscriptionCheckout',
    url: '/subscription-checkout'
    templateUrl: 'client/checkout/views/subscription-checkout.ng.html'
    controller: 'subscribeCtrl',
    resolve:
      "currentUser" : ($meteor) ->
        $meteor.requireUser()

  .state 'profile.subscriptionCheckout.success',
    url: '/success'
    templateUrl: 'client/checkout/views/success.ng.html'

  .state 'profile.subscriptionCheckout.failure',
    url: '/failure'
    templateUrl: 'client/checkout/views/failure.ng.html'
