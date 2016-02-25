Package.describe({
  name: 'redhead:remarkable',
  version: '1.6.2',
  // Brief, one-line summary of the package.
  summary: 'Markdown parser done right. Fast and easy to extend.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jonschlinkert/remarkable',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

// Npm.depends({
//   remarkable: "1.6.2",
// });

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.addFiles('bower_components/remarkable/dist/remarkable.js');
  // api.export('Remarkable');
});