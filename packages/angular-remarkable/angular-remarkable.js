
'use strict';

angular.module('remarkable', [])
  .provider('remarkable', [function () {
    var opts = {};
    return {
      config: function (newOpts) {
        opts = newOpts;
      },
      $get: function () {
        return new Remarkable(opts);
      }
    };
  }])
  .filter('md', ['remarkable', function (remarkable) {
    return function (text) {
      return remarkable.render(text || '');
    };
  }]);