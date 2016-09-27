Meteor.startup ->
  if process.env.METEOR_ENVIRONMENT == 'production'
    process.env.MAIL_URL = Meteor.settings.SMTP
  
  ServiceConfiguration.configurations.upsert service: 'facebook',
    service: 'facebook'
    appId: Meteor.settings.facebook.appId
    secret: Meteor.settings.facebook.secret
    

