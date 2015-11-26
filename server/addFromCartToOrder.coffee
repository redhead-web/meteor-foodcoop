
Meteor.methods
  addFromCartToOrder: (products, total, transactionId) ->
    userId = this.userId
    check transactionId, String

    orderTotal = _.reduce(products, ((total, product) ->
      total + product.qty * product.details.price
    ), 0)



    id = Orders.insert
      transactionTotal: parseFloat(total, 10)
      user: userId
      orderTotal: orderTotal
      status: 'paid'
      transactionId: transactionId

    if typeof id != 'string'
      return id

    sales = _.map products, (sale) ->
      # sale.qty = sale.qty
      # sale.productId = sale.productId
      sale.producerId = sale.details.producer
      sale.price = sale.details.price
      sale.productName = sale.details.name
      sale.packagingDescription = sale.details.packagingDescription
      sale.packagingRefund = sale.details.packagingRefund

      sale.orderId = id
      sale.deliveryDay = GetDeliveryDay()
      sale.customer = userId

      delete sale._id
      delete sale.details

      sale


    for sale in sales
      Sales.insert sale

    update = Meteor.users.update {
      _id: userId
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
      'carted.user': userId
    ,
      $pull: 'carted.user' : userId
    ,
      multi:yes
    , (error) ->
      throw new Meteor.Error 500, "removing carted objects from product failed." if error
