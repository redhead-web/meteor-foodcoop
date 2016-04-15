Meteor.publish 'payments', ->
  if Roles.userIsInRole @userId, 'admin'
    paymentsCursor = Payments.find()
    userIds = paymentsCursor.map (p) -> p.user
    
    return [
      paymentsCursor,
      Meteor.users.find _id: $in: userIds
      , 
        fields: 
          'profile.companyName' : 1
          'profile.name' : 1
    ]
    
  else
    @ready()