import angular from 'angular';
import Remarkable from 'remarkable';

export default angular.module('remarkable', [])
  .provider('remarkable', [function provider() {
    let opts = {};
    return {
      config(newOpts) {
        opts = newOpts;
      },
      $get() {
        return new Remarkable(opts);
      },
    };
  }])
  .filter('md', ['remarkable', remarkable => text => remarkable.render(text || ''),
  ]);
