angular.module("food-collective").run(["$rootScope", "$state", function($rootScope, $state) {
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

angular.module('food-collective').config( function($urlRouterProvider, $stateProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('store', {
      url: '/store',
      templateUrl: 'client/products/views/products-list.ng.html',
      controller: 'ProductsListCtrl'
    })
    .state('productDetails', {
      url: '/product/:productId',
      templateUrl: 'client/products/views/product-details.ng.html',
      controller: 'ProductDetailsCtrl',
      resolve: {
        "admin" : function($meteor) {
          return $meteor.requireValidUser(isAdmin);
        }
      }
    })
    .state('productCreate', {
      url: '/new-product',
      templateUrl: 'client/products/views/product-create.ng.html',
      controller: 'ProductCreateCtrl'
    })
    .state('hubs', {
      url: '/pickup',
      templateUrl: 'client/hubs/views/hubs-list.ng.html',
      controller: 'HubsListCtrl',
      resolve: {
        'subscription': function($meteor) {
          return $meteor.subscribe('hubs')
        }
      }
    })
    .state('hubDetails', {
      url: '/pickup/:hubId',
      templateUrl: 'client/hubs/views/hub-detail.ng.html',
      controller: 'HubDetailsCtrl',
      resolve: {
        "admin" : function($meteor) {
          return $meteor.requireValidUser(isAdmin);
        }
      }
    })
    .state('profile', {
      url: '/me',
      templateUrl: 'client/user/views/profile.ng.html',
      controller: 'ProfileCtrl',
      resolve: {
        "currentUser" : function($meteor) {
          return $meteor.requireUser();
        }
      }
    })
    ;

    $urlRouterProvider.otherwise('/store');
});


function isAdmin (user) {
  return Roles.userIsInRole(user, 'admin')
}
