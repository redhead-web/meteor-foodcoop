# Meteor.methods
#   confirmOrder: ->
#     user = Meteor.users.findOne(@userId)
#     invoiceNumber = Random.id(6)
#     if Roles.userIsInRole 'wholesaleBuyer'
#       order =
#         recipient: user.profile.name
#         number: invoiceNumber
#         date: moment().format('dddd, MMMM Do YYYY')
#         items: user.profile.cart.products
#
#       result = Mailer.send
#         to: "#{user.profile.name} <#{user.emails[0].address}>"
#         subject: "Fresh Food Collective Order"
#         template: "confirmOrderEmail"
#         data: order
#
#       if result
#         # TODO: create inactive subscriptions from cart?
#         console.log "Successfully sent order confirmation email"
#     else
#       "You don't have permission to get emailed invoices"
