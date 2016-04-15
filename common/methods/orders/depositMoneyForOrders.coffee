Meteor.methods
  "depositMoneyForOrders": ->
    if Roles.userIsInRole @userId, 'admin'
      result = Orders.update {cashAmount: {$exists: 1}}, {$set: cashDeposited: true}, multi: true
      return result
    else
      throw new Meteor.Error 401, "Only admins can do this"
      