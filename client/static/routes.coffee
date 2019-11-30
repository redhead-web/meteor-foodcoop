import policyTemplate from './legal/views/policy.ng.html'
import termsTemplate from './legal/views/terms.ng.html'
import privacyTemplate from './legal/views/privacy.ng.html'
import customerbenefitsTemplate from './views/customer-benefits.ng.html'
import producerbenefitsTemplate from './views/producer-benefits.ng.html'
import topupTemplate from './views/top-up.html'
import requestFormTemplate from './views/requestForm.ng.html'

angular.module('food-coop').config ($stateProvider) ->
  $stateProvider.state('requests',
    url: '/requests',
    template: requestFormTemplate
    controller: 'requestFormCtrl',
    controllerAs: 'requestForm',
  ).state('policy',
    url: '/policy'
    template: policyTemplate
  ).state('terms',
    url: '/terms-conditions'
    template: termsTemplate
  ).state('privacy',
    url: '/privacy-policy'
    template: privacyTemplate
  ).state('customer-benefits',
    url: '/features/customer'
    template: customerbenefitsTemplate
  ).state('producer-benefits',
    url: '/features/producer'
    template: producerbenefitsTemplate
  ).state('top-up',
    url: '/top-up'
    template: topupTemplate
  )


return
