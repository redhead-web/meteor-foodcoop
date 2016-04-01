Package.describe({
  name: 'redhead:angular-youtube-embed',
  version: '1.1.2',
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
  api.use(['angular', 'adrianliaw:youtube-iframe-api'], 'client');
  api.addFiles('angular-youtube-embed.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('redhead:angular-youtube-embed');
  api.addFiles('angular-youtube-embed-tests.js', 'client');
});
