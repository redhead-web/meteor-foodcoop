import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import angular from 'angular';
import angularMessages from 'angular-messages';
import angularSanitize from 'angular-sanitize';
import angularAnimate from 'angular-animate';

import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngFileUpload from 'ng-file-upload';
import angularMeteor from 'angular-meteor';
import 'angular-simple-logger';
import 'angular-google-maps';
import { name as navigation } from '../../imports/ui/components/navigation/navigation';
import { name as productCreate } from '../../imports/ui/components/productCreate/productCreate';
import 'cloudinary-angular/dist/cloudinary-angular.js';
// import icons from 'material-design-icons';
// import {name as eventList} from '../../imports/ui/components/eventList/eventList';
// import {name as requestList} from '../../imports/ui/components/requestList/requestList'
import { name as productsList } from '../../imports/ui/components/productsList/productsList';

angular.module('food-coop', [
  angularMessages,
  angularSanitize,
  angularAnimate,
  angularMeteor,
  'angular-meteor.auth',
  navigation,
  productCreate,
  productsList,
//  eventList,
//   requestList,
  uiRouter,
  ngMaterial,
  ngFileUpload,
  'nemLogging',
  'uiGmapgoogle-maps',
  'google.places',
  'cloudinary',
  '720kb.socialshare',
  'remarkable',
  'multi-avatar',
  'ngLetterAvatar',
  'youtube-embed',
])
.config(($mdIconProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider, CloudinaryProvider) => {
  'ngInject';
  $mdIconProvider
    .iconSet('social', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg')
    .iconSet('action', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg')
    .iconSet('maps', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-maps.svg')
    .iconSet('content', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg')
    .iconSet('file', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-file.svg')
    .iconSet('toggle', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg')
    .iconSet('navigation', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg')
    .iconSet('image', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg')
    .iconSet('communication', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg')
    .iconSet('av', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg')
    .iconSet('editor', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg')
    .iconSet('alert', '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-alert.svg');

  $mdThemingProvider
  .theme('default')
  .primaryPalette('light-green')
  .accentPalette('brown');

  $mdThemingProvider
  .theme('dark-default')
  .primaryPalette('light-green')
  .accentPalette('brown')
  .dark();

  CloudinaryProvider.configure({
    cloud_name: Meteor.settings.public.cloudinary.cloud_name,
    api_key: Meteor.settings.public.cloudinary.upload_preset,
  });

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyAkO_T5K7pMUkZIEK5U-mEIx3aG6WZZ7_4',
    v: '3.22', // defaults to latest 3.X anyhow
    libraries: 'places,geometry,visualization',
  });
})
.run(($rootScope) => {
  'ngInject';
  $rootScope.hasRole = Roles.userIsInRole;

  $rootScope.title = 'Fresh Local Quality | Whangarei Food Co-op';
  $rootScope.ogImage = '/OpenGraph.png';

  // Meteor.subscribe('active-products');
  // $meteor.subscribe('hubs');

  $rootScope.$on('$stateChangeSuccess', () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
});

function onReady() {
  angular.bootstrap(document, ['food-coop'], {
    strictDi: true,
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
