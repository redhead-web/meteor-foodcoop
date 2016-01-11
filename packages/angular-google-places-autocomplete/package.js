Package.describe({
  name: 'redhead:angular-google-places-autocomplete',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('pbastowski:angular-babel');
  api.use('angular', 'client');
  api.addFiles('angular-google-places-autocomplete.js', 'client');
  api.addFiles('angular-google-places-autocomplete.css', 'client');
  // api.export('google');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('redhead:angular-google-places-autocomplete');
  api.addFiles('angular-google-places-autocomplete-tests.js');
});
