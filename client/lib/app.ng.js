angular.module('food-collective',[
  'angular-meteor',
  'ui.router',
  'uiGmapgoogle-maps',
  'ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').primaryPalette('orange').accentPalette('indigo');
})

.config(['$mdIconProvider', function ($mdIconProvider) {
  $mdIconProvider
    .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
    .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
    .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
    .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
    .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
    .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
    .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
}])


.run(function($rootScope, $meteor) {
  $rootScope.hasRole = Roles.userIsInRole;

  $meteor.subscribe('products');
})
