# Meteor.methods
#   confirmSubscription: (productName) ->
#     user = Meteor.users.findOne(@userId)
#
#     result = Mailer.send
#       to: "#{user.profile.name} <#{user.emails[0].address}>"
#       subject: "Fresh Food Collective Order"
#       template: "subscriptionConfirmation"
#       data: productName
#
#     if result
#       # TODO: create inactive subscriptions from cart?
#       console.log "Successfully sent subscription confirmation email"
