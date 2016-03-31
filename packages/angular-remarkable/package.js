Package.describe({
  name: 'redhead:angular-remarkable',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'remarkable markdown filter for angularJS',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.imply(['angular', 'redhead:remarkable@1.6.2'], 'client');
  api.addFiles('angular-remarkable.js', 'client');
});
