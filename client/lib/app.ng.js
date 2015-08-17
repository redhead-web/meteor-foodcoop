angular.module('food-collective',[
  'angular-meteor',
  'ui.router',
  'uiGmapgoogle-maps',
  'ngMaterial'])
.run(function($rootScope) {
  $rootScope.hasRole = Roles.userIsInRole;
})
