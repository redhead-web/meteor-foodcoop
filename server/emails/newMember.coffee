Meteor.methods
  newMemberEmail: (isProducer) ->

    user = Meteor.users.findOne(this.userId)

    send = Mailer.send
      to: "#{user.profile.name} <#{user.emails[0].address}>"
      replyTo: "#{Meteor.settings.email.name} <#{Meteor.settings.email.address}>"
      subject: "Welcome to the Kaikohekohe Food Co-op"
      template: 'newMember'
      data:
        recipient: user.profile.name
        userId: user._id
        producer: isProducer
