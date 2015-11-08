angular.module('food-coop',[
  'angular-meteor',
  'ui.router',
  'uiGmapgoogle-maps',
  'google.places',
  'angularUtils.directives.dirPagination',
  'ngMaterial'])
// .config(function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         //    key: 'your api key',
//         v: '3.20', //defaults to latest 3.X anyhow
//         libraries: 'weather,geometry,visualization'
//     });
// })
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').primaryPalette('light-green').accentPalette('brown');
  $mdThemingProvider.theme('orange').primaryPalette('orange').accentPalette('teal').warnPalette('red');
  $mdThemingProvider.theme('dark-default').primaryPalette('light-green').accentPalette('brown').dark();
})
// .config(function(paginationTemplateProvider) {
//     paginationTemplateProvider.setPath('admin/views/dirPagination.ng.html');
// })

.run(function($rootScope, $meteor) {
  $rootScope.hasRole = Roles.userIsInRole;

  $meteor.subscribe('products');
  $meteor.subscribe('hubs');
});
