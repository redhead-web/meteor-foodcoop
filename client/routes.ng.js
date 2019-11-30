import angular from 'angular';
import faqTemplate from './static/views/faq.ng.html';
import aboutTemplate from './static/views/about.ng.html';
import contactTemplate from './static/views/contact.ng.html';
import profileTemplate from './user/views/profile.ng.html';

angular.module('food-coop').run(['$rootScope', '$state', ($rootScope, $state) => {
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      $state.go('store');
    } else if (error === 'FORBIDDEN') {
      $state.go('store');
    }
  });
}]);

angular.module('food-coop').config(($urlRouterProvider, $stateProvider, $locationProvider) => {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('faq', {
      url: '/faq',
      template: faqTemplate,
    })
    .state('about', {
      url: '/about-us',
      template: aboutTemplate,
    })
    .state('contact', {
      url: '/contact-us',
      template: contactTemplate,
      controller: 'contactCtrl',
      controllerAs: 'msg',
    })
    .state('profile', {
      url: '/me',
      template: profileTemplate,
    // controller: 'ProfileCtrl',
    });

  $urlRouterProvider.otherwise('/');
});
