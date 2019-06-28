###

Sales Hooks

If a product was paid for upfront we still give refunds
but we can't then pay the producer less so we don't adjust their balance

###

Sales.after.insert (userId, sale) ->
  if Meteor.isServer
    product = Products.findOne sale.productId
    if product && !product.paidUpfront
      return Meteor.users.update(sale.producerId, { $inc: 'profile.balance': sale.price * sale.qty })

Sales.after.update (userId, sale, fieldNames, modifier, options) ->
  if Meteor.isServer
    product = Products.findOne sale.productId

    if sale.status != @previous.status and sale.status == 'refunded'
      if product && !product.paidUpfront
        Meteor.users.update(sale.producerId, { $inc: 'profile.balance': -1 * sale.price * sale.qty })

      Meteor.users.update(sale.customerId, { $inc: 'profile.balance': Markup(sale).saleTotal() })

      Orders.insert {
        user: sale.customerId,
        recipient: sale.customerId,
        balanceAmount: Markup(sale).saleTotal()
        orderTotal: Markup(sale).saleTotal()
        status: 'credited',
        note: "refund for x#{sale.qty} #{sale.productName}"
        dateCreated: new Date()
      }
      # should it go back into inventory?
      return
    if sale.status != @previous.status and @previous.status == 'refunded'
      if product && !product.paidUpfront
        Meteor.users.update(
          sale.producerId,
          { $inc: 'profile.balance': sale.price * sale.qty }
        )

      Meteor.users.update(
        sale.customerId,
        { $inc: 'profile.balance': -1 * Markup(sale).saleTotal() }
      )

      Orders.insert {
        user: sale.customerId,
        recipient: sale.customerId,
        balanceAmount: Markup(sale).saleTotal()
        orderTotal: Markup(sale).saleTotal()
        status: 'debited',
        note: "returned refund of x#{sale.qty} #{sale.productName}"
        dateCreated: new Date()
      }

      return
