Package.describe({
  name: 'fixtures',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
	api.use('ecmascript');
  api.use(['underscore', 'mongo'], 'server');
  api.addFiles('fixtures.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('fixtures');
  api.addFiles('fixtures-tests.js');
});
