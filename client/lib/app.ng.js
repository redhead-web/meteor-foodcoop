angular.module('food-collective',[
  'angular-meteor',
  'ui.router',
  'uiGmapgoogle-maps',
  'google.places',
  'ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').primaryPalette('light-green').accentPalette('brown');
  $mdThemingProvider.theme('orange').primaryPalette('orange').accentPalette('teal').warnPalette('red');
  $mdThemingProvider.theme('dark-default').primaryPalette('light-green').accentPalette('brown').dark();
})

.run(function($rootScope, $meteor) {
  $rootScope.hasRole = Roles.userIsInRole;

  $meteor.subscribe('products');
})
