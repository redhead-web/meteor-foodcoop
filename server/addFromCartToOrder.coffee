Meteor.methods
  addFromCartToOrder: (products, data, transactionId) ->
    userId = @userId
    
    check products, Array
    check data, Object
    
    if transactionId
      check transactionId, String

    try
      id = Orders.insert
        user: this.userId
        orderTotal: data.orderTotal
        cardAmount: data.cardAmount
        balanceAmount: data.balanceAmount
        status: 'paid'
        transactionId: transactionId
    catch error
      if data.balanceAmount > 0
        Meteor.users.update @userId,
          $inc: 'profile.balance': data.balanceAmount
      throw new Meteor.Error error.status, error.message

    if typeof id != 'string'
      return id

    sales = _.map products, (sale) =>
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
      sale.deliveryDay = GetDeliveryDay()
      sale.customerId = @userId
      sale.customerName = Meteor.users.findOne(@userId).profile.name
      sale.customerNumber = Meteor.users.findOne(@userId).profile.customerNumber
      sale.extraMarkup = sale.details.extraMarkup

      delete sale._id
      delete sale.details

      sale

    try
      for sale in sales
        Sales.insert sale

      update = Cart.Items.remove userId: @userId

      if typeof update != 'number'
        return update

      Products.update
        'carted.user': @userId
      ,
        $pull: 'carted' : 'user' : @userId
      ,
        multi: yes
        
      Meteor.users.update @userId,
        $set: 'profile.lastOrder': _.pluck(products, 'productId')
        
      Meteor.call "confirmOrder", products, data
        
    catch error
      if data.balanceAmount > 0
        Meteor.users.update @userId,
          $inc: 'profile.balance': data.balanceAmount
      throw new Meteor.Error error.status, error.message
