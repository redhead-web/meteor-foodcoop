Meteor.methods
  '/email/contactForm': (content) ->
    check content, Object
    check content.email, String
    check content.subject, String
    check content.name, String
    check content.body, String

    result = Mailer.send
      to: "#{Meteor.settings.email.name} <#{Meteor.settings.email.address}>"
      replyTo: "#{content.name} <#{content.email}>"
      subject: content.subject
      template: "contactMessage"
      data: content

    if result
      # TODO: create inactive subscriptions from cart?
      console.log "Successfully sent contact form message"
    else
      "You don't have permission to get emailed invoices"
      