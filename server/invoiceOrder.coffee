Meteor.methods
  invoiceOrder: ->
    user = Meteor.users.findOne(@userId)
    if Roles.userIsInRole 'wholesaleBuyer'
      invoice =
        recipient: user.profile.name
