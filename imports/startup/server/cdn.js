
Meteor.startup(() => {
  if (process.env.METEOR_ENVIRONMENT === 'production') {
    WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix);
  }
});
