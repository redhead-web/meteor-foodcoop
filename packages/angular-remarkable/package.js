/* globals Package, Npm */
Package.describe({
  name: 'redhead:angular-remarkable',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'remarkable module and filter for angular js',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Npm.depends({
  remarkable: '1.6.2',
});

Package.onUse(function (api) {
  api.versionsFrom('1.3.4.1');
  api.use('ecmascript');
  api.imply('angular', 'client');
  api.mainModule('angular-remarkable.js', 'client');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('redhead:angular-remarkable');
  api.mainModule('angular-remarkable-tests.js', 'client');
});
