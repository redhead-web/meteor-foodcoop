Sales.after.insert (userId, sale) ->
  if Meteor.isServer
    Meteor.users.update(sale.producerId, {$inc: 'profile.balance': sale.price*sale.qty})
  
Sales.after.update (userId, sale, fieldNames, modifier, options) ->
  if Meteor.isServer
    if sale.status != @previous.status and sale.status == 'refunded'
      Meteor.users.update(sale.producerId, {$inc: 'profile.balance': -sale.price*sale.qty})
      Meteor.users.update(sale.customerId, {$inc: 'profile.balance': Markup(sale).saleTotal()})
      return
    if sale.status != @previous.status and @previous.status == 'refunded'
      Meteor.users.update(sale.producerId, {$inc: 'profile.balance': sale.price*sale.qty})
      Meteor.users.update(sale.customerId, {$inc: 'profile.balance': Markup(sale).saleTotal()})
      return