Package.describe({
  name: 'redhead:angular-autoform',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({'lodash': '4.11.0'})

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use(['ecmascript', 'aldeed:simple-schema']);
  api.use('angular:angular@1.5.3', 'client', { weak: true });
  api.mainModule('angular-autoform.js', 'client');
  api.mainModule('angular-autoform-schema.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('redhead:angular-autoform');
  api.mainModule('angular-autoform-tests.js');
});
