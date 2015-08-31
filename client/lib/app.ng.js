angular.module('food-collective',[
  'angular-meteor',
  'ui.router',
  'uiGmapgoogle-maps',
  'ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').primaryPalette('orange').accentPalette('indigo');
})


.run(function($rootScope, $meteor) {
  $rootScope.hasRole = Roles.userIsInRole;

  $meteor.subscribe('products');
})
