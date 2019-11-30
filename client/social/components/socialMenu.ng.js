import angular from 'angular';
import template from './social-menu.ng.html';

angular.module('food-coop')
  .directive('fcSocialMenu', () => ({
    restrict: 'E',
    scope: {
      url: '@url',
      class: '@class',
      text: '@text',
      media: '@media',
    },
    // transclude: true,
    // replace: true,
    template,
  }));
