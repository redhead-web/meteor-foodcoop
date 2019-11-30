import successTemplate from './views/success.ng.html'
import failureTemplate from './views/failure.html'

angular.module('food-coop').config ($stateProvider) ->
  $stateProvider
  .state 'checkoutSuccess',
    url: '/success'
    template: successTemplate

  .state 'profile.subscriptionCheckout.success',
    url: '/success-subscription'
    template: successTemplate

  .state 'profile.subscriptionCheckout.failure',
    url: '/failure-subscription'
    template: failureTemplate
