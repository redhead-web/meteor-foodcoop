import uiRouter from 'angular-ui-router'
import ngMaterial from 'angular-material'

angular.module('food-coop',[
  'ngMessages',
  'ngSanitize',
  'ngAnimate',
  'angular-meteor',
  'angular-meteor.auth',
   uiRouter,
   ngMaterial,
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
.config(function ($mdThemingProvider, uiGmapGoogleMapApiProvider, cloudinaryProvider) {
  "ngInject";
  $mdThemingProvider.theme('default').primaryPalette('light-green').accentPalette('brown');
  $mdThemingProvider.theme('orange').primaryPalette('orange').accentPalette('teal').warnPalette('red');
  $mdThemingProvider.theme('dark-default').primaryPalette('light-green').accentPalette('brown').dark();
  
  cloudinaryProvider
      .set("cloud_name", Meteor.settings.public.cloudinary.cloud_name)
      .set("upload_preset", Meteor.settings.public.cloudinary.upload_preset);
      
  uiGmapGoogleMapApiProvider.configure({
      //    key: 'your api key',
      v: '3.22', //defaults to latest 3.X anyhow
      libraries: 'places,geometry,visualization'
  });
})
.run(function($rootScope) {
  $rootScope.hasRole = Roles.userIsInRole;
  
  $rootScope.title = "Fresh Local Quality | Whangarei Food Co-op"
  $rootScope.ogImage = "/OpenGraph.png"

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
