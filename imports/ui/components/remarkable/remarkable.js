import angular from 'angular';
import Remarkable from 'remarkable';

export const name = 'remarkable';

export default angular.module(name, [])
  .provider(name, [function provider() {
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
