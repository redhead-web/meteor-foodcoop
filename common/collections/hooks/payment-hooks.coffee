Payments.after.insert (userId, payment) ->
  if Meteor.isServer and payment.updateBalance
    Meteor.users.update payment.user,
      $inc: 'profile.balance': -payment.amount