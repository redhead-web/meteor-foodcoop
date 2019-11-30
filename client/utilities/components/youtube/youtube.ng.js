import angular from 'angular';
import template from './index.html';

angular.module('food-coop').component('fcVideo', {
  template,
  // controller: function() {YT.load()},
  bindings: {
    videoUrl: '<',
  },
});
