Package.describe({
  name: 'redhead:angular-socialshare',
  version: '0.1.20',
  // Brief, one-line summary of the package.
  summary: 'bower version of angular-socialshare',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('angular', 'client');
  api.addFiles('bower_components/angular-socialshare/dist/angular-socialshare.min.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('angular-socialshare');
  api.addFiles('angular-socialshare-tests.js');
});
