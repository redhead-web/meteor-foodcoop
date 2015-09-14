Meteor.startup ->
  if process.env.METEOR_ENVIRONMENT == 'production'
    process.env.MAIL_URL = 'smtp://postmaster%40mg.strategicdevelopment.nz:c6317514103d5b3d9e43e60aedc4c607@smtp.mailgun.org:587'
