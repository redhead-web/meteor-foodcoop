Meteor.methods
  "depositMoneyForOrders": ->
    if Roles.userIsInRole @userId, 'admin'
      result = Orders.update {cashAmount: {$exists: 1}, cashDeposited: {$ne: true}}, {$set: cashDeposited: true, dateDeposited: new Date()}, multi: true
      return result
    else
      throw new Meteor.Error 401, "Only admins can do this"
      