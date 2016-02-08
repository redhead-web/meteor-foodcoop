Package.describe({
  name: 'angular-credit-cards',
  version: '2.4.0',
  // Brief, one-line summary of the package.
  summary: 'Angular directives for constructing credit card payment forms.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/bendrucker/angular-credit-cards.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['jquery', 'angular'], 'client');
  api.addFiles('bower_coponents/angular-credit-cards/release/angular-credit-cards.js');
});
//
// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('angular-credit-cards');
//   api.addFiles('angular-credit-cards-tests.js');
// });
