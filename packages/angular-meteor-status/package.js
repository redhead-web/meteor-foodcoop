Package.describe({
  name: 'redhead:angular-meteor-status',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'component for meteor connection status. Works with angular-material',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('angular', 'client');
  api.addFiles('angular-meteor-status.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('redhead:angular-meteor-status');
  api.addFiles('angular-meteor-status-tests.js');
});
