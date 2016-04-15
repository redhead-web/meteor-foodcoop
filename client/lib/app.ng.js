angular.module('food-coop',[
  'ngMessages',
  'ngSanitize',
  'angular-meteor',
  'angular-meteor.auth',
  'ui.router',
  'ngMaterial',
  'uiGmapgoogle-maps',
  'google.places',
  'ngFileUpload',
  'cloudinary',
  '720kb.socialshare',
  'remarkable',
  'multi-avatar',
  'ngLetterAvatar',
  'youtube-embed'
])
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.22', //defaults to latest 3.X anyhow
        libraries: 'places,geometry,visualization'
    });
})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').primaryPalette('light-green').accentPalette('brown');
  $mdThemingProvider.theme('orange').primaryPalette('orange').accentPalette('teal').warnPalette('red');
  $mdThemingProvider.theme('dark-default').primaryPalette('light-green').accentPalette('brown').dark();
})
// .config(function(paginationTemplateProvider) {
//     paginationTemplateProvider.setPath('admin/views/dirPagination.ng.html');
// })

.run(function($rootScope) {
  $rootScope.hasRole = Roles.userIsInRole;
  
  $rootScope.title = "Fresh Local Quality | Kai Kohekohe Food Co-op"


  // Meteor.subscribe('active-products');
  // $meteor.subscribe('hubs');
  
  $rootScope.$on('$stateChangeSuccess', function() {
     document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
});

function onReady() {
  angular.bootstrap(document, ['food-coop'], {
    strictDi: true
  });
}
 
if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
