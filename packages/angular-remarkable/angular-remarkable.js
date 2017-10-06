/* globals Package, angular */
import Remarkable from 'remarkable';

if (!window.angular) {
  try {
    if (Package['modules-runtime']) {
      const require = Package['modules-runtime'].meteorInstall();
      require('angular');
    }
  } catch (e) {
    throw new Error('angular package is missing');
  }
}

// If you are using the dependency in the same file, you'll need to use require, otherwise
// you can continue to `import` in another file.

// Variables exported by this module can be imported by other packages and
// applications. See angular-remarkable-tests.js for an example of importing.
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
