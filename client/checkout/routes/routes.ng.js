angular.module('food-collective').config( function($stateProvider) {
  $stateProvider
  .state('checkout.success', {
    url: '/success',
    templateUrl: 'client/checkout/views/cart.ng.html'
  })
  .state('checkout.failure', {
    url: '/failure',
    templateUrl: 'client/checkout/views/subscriptions.ng.html'
  });
});
