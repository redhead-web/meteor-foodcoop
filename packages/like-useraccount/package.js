Package.describe({
  name: 'redhead:like-useraccount',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'a simple social likes collection and validation',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('1.5.1');
  api.use(['ecmascript', 'mongo', 'random', 'coffeescript', 'check', 'aldeed:collection2']);
  api.use(['tracker', 'session'], 'client');
  api.addFiles('like-useraccount.coffee');
  api.export('Likes');
});

Package.onTest((api) => {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('redhead:like-useraccount');
  api.addFiles('like-useraccount-tests.js');
});
