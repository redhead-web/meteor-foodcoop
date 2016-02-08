Package.describe({
  name: 'redhead:eway',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'an eway rapid api wrapper for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 'underscore', 'promise']);
  api.addFiles('eway.js', 'server');
  api.export(['ewayRapid', 'ewayConnect'], 'server');
});

Package.onTest(function(api) {
  api.use(['ecmascript', 'underscore']);
  api.use('tinytest');
  api.use('redhead:eway');
  api.addFiles('eway-tests.js');
});

Npm.depends({
  "eway-rapid": "1.2.0"
})