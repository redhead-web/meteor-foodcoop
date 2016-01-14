
Meteor.methods
  addFromCartToOrder: (products, total, transactionId) ->
    userId = this.userId
    check transactionId, String

    orderTotal = _.reduce(products, ((total, product) ->
      total + product.qty * product.details.price
    ), 0)

    id = Orders.insert
      transactionTotal: parseFloat(total)
      user: this.userId
      orderTotal: orderTotal * Meteor.settings.public.markup/100+1
      status: 'paid'
      transactionId: transactionId

    if typeof id != 'string'
      return id

    sales = _.map products, (sale) =>
      # sale.qty = sale.qty
      # sale.productId = sale.productId
      sale.producerId = sale.details.producer
      sale.producerName = Meteor.users.findOne(sale.details.producer).profile.name
      sale.producerNumber = Meteor.users.findOne(sale.details.producer).profile.customerNumber
      sale.price = sale.details.price
      sale.productName = sale.details.name
      sale.packagingDescription = sale.details.packagingDescription
      sale.packagingRefund = sale.details.packagingRefund
      sale.unitOfMeasure = sale.details.unitOfMeasure
      sale.orderId = id
      sale.deliveryDay = GetDeliveryDay()
      sale.customerId = this.userId
      sale.customerName = Meteor.users.findOne(this.userId).profile.name
      sale.customerNumber = Meteor.users.findOne(this.userId).profile.customerNumber

      console.log "#{sale.customerNumber} #{sale.customerName} #{sale.packagingRefund} #{sale.customerNumber}"

      delete sale._id
      delete sale.details

      sale


    for sale in sales
      Sales.insert sale

    update = Meteor.users.update {
      _id: this.userId
    }, {
      $set:
        'profile.cart.status': 'active'
        'profile.lastOrder': _.pluck products, 'productId'
      $unset:
        'profile.cart.products': ""
    }

    if typeof update != 'number'
      return update

    Products.update
      'carted.user': this.userId
    ,
      $pull: 'carted' : 'user' : this.userId
    ,
      multi:yes
    , (error) ->
      throw new Meteor.Error 500, "removing carted objects from product failed." if error
