Payments.after.insert (userId, payment) ->
  check payment, Object
  if Meteor.isServer and payment.updateBalance and userId and Roles.userIsInRole userId, 'admin'
    Meteor.users.update payment.user,
      $inc: 'profile.balance': -payment.amount