Sales.after.insert (userId, sale) ->
  Meteor.users.update(sale.producerId, {$inc: 'profile.balance': sale.price*sale.qty})
