angular.module("food-coop").run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go('store');
    } else if (error === "FORBIDDEN") {
      $state.go('store');
    }
  });
}]);

angular.module('food-coop').config( function($urlRouterProvider, $stateProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('faq', {
      url: '/faq',
      templateUrl: 'client/static/views/faq.ng.html',
    })
    .state('about', {
      url: '/about-us',
      templateUrl: 'client/static/views/about.ng.html',
    })
    .state('contact', {
      url: '/contact-us',
      templateUrl: 'client/static/views/contact.ng.html',
      controller: 'contactCtrl',
      controllerAs: 'msg'
    })
    .state('profile', {
      url: '/me',
      templateUrl: 'client/user/views/profile.ng.html',
      controller: 'ProfileCtrl',
      resolve: {
        "currentUser" : function($auth) {
          return $auth.requireUser();
        }
      }
    })
    .state('requests', {
      url: '/requests',
      template: "<request-list></request-list>"
    });

    $urlRouterProvider.otherwise('/store');
});


function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin')
}
