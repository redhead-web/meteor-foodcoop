Meteor.startup ->
  if process.env.METEOR_ENVIRONMENT == 'production'
    process.env.MAIL_URL = 'smtp://postmaster%40kaicoop.nz:RdvBxlYJ9HHeOrSdemFA6X@smtp.mailgun.org:587'
    
  # process.env.MAIL_URL = 'smtp://postmaster%40kaicoop.nz:15c6d42356412d1a60742550a4e7f597@smtp.mailgun.org:587'
