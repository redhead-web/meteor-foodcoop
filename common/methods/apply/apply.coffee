Meteor.methods
  apply: (application) ->

    check application, Object

    unless this.userId
      throw new Meteor.Error 500, 'no user for this application'

    Meteor.users.update this.userId,
      $set:
        'profile.certification': application.certification
        'profile.chemicals': application.chemicals

    if Meteor.isServer
      this.unblock()
      
    if this.isSimulation
      return true
      
    Mailer.send
      to: 'sean@maplekiwi.com'
      subject: 'Producer Application'
      template: 'applications'
      data:
        application: application
        user: Meteor.user()
        email: Meteor.user().emails[0].address
