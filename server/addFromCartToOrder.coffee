# Don't supply data.deliveryDay unless data.deliveryDay comes from a POS sale. Maybe refactor this later?

Meteor.methods

  "/admin/addFromCartToOrder": (customerId, items, data, transactionId) ->
    if Roles.userIsInRole @userId, 'admin'
      self = this
      self.userId = customerId
      Meteor.call.call self, "addFromCartToOrder", items, data, transactionId
      
  addFromCartToOrder: (items, data, transactionId) ->
    userId = @userId
    
    check items, Array
    check data, Object
    
    if transactionId
      check transactionId, String

    try
      id = Orders.insert
        user: @userId
        orderTotal: data.orderTotal
        cardAmount: data.cardAmount
        balanceAmount: data.balanceAmount
        cashAmount: data.cashAmount || 0
        status: 'paid'
        transactionId: transactionId
    catch error
      if data.balanceAmount > 0
        Meteor.users.update @userId,
          $inc: 'profile.balance': data.balanceAmount
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
      sale.deliveryDay = data.deliveryDay || GetDeliveryDay()
      sale.customerId = @userId
      sale.customerName = Meteor.users.findOne(@userId).profile.name
      sale.customerNumber = Meteor.users.findOne(@userId).profile.customerNumber
      sale.extraMarkup = sale.details.extraMarkup

      delete sale._id
      delete sale.details

      sale

    try
      for sale in sales
        # POS sale checkout since deliveryDay was supplied
        if data.deliveryDay? and moment(data.deliveryDay).format() == moment().day(Meteor.settings.public.deliveryDayOfWeek).startOf('day').format()
          sale.status = 'collected'
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
        $set: 'profile.lastOrder': _.pluck(items, 'productId')
        
      Meteor.call "confirmOrder", items, data
        
    catch error
      if data.balanceAmount > 0
        Meteor.users.update @userId,
          $inc: 'profile.balance': data.balanceAmount
      throw new Meteor.Error error.status, error.message
