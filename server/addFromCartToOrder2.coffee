# Don't supply data.deliveryDay unless data.deliveryDay comes from a POS sale. Maybe refactor this later?

Meteor.methods

  addFromCartToOrder2: (order, items, status) ->
    try
      id = Orders.insert order
    catch error
      if order.balanceAmount > 0
        Meteor.users.update order.user,
          $inc: 'profile.balance': order.balanceAmount
      throw new Meteor.Error error.status, error.message

    if typeof id != 'string'
      return id

    sales = _.map items, (sale) =>
      # sale.qty = sale.qty
      # sale.productId = sale.productId
      sale.producerId = sale.details.producer
      sale.producerName = Meteor.users.findOne(sale.details.producer).profile.name
      sale.producerNumber = Meteor.users.findOne(sale.details.producer).profile.customerNumber
      sale.price = sale.details.price
      sale.gst = Meteor.users.findOne(sale.details.producer).profile.gst
      sale.productName = sale.details.name
      sale.packagingDescription = sale.details.packagingDescription
      sale.packagingRefund = sale.details.packagingRefund
      sale.unitOfMeasure = sale.details.unitOfMeasure
      sale.orderId = id
      sale.deliveryDay = GetProductDeliveryDay(sale.details.daysNotice).format()
      sale.customerId = order.user
      sale.customerName = Meteor.users.findOne(order.user).profile.name
      sale.customerNumber = Meteor.users.findOne(order.user).profile.customerNumber
      sale.extraMarkup = sale.details.extraMarkup
      sale.daysNotice = sale.details.daysNotice

      # new feature
      sale.status = status

      delete sale._id
      delete sale.details

      sale

    try
      for sale in sales
        Sales.insert sale

      update = Cart.Items.direct.remove userId: order.user

      if typeof update != 'number'
        return update

      Products.update
        'carted.user': order.user
      ,
        $pull: 'carted' : 'user' : order.user
      ,
        multi: yes

      Meteor.users.update order.user,
        $set: 'profile.lastOrder': _.pluck(items, 'productId')

      Meteor.call "confirmOrder", items, order

    catch error
      if order.balanceAmount > 0
        Meteor.users.update order.user,
          $inc: 'profile.balance': order.balanceAmount
      throw new Meteor.Error error.status, error.message
