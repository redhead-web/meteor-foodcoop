
Meteor.methods
  addFromCartToOrder: (products, total, transactionId, subscriptionId) ->
    userId = this.userId
    check transactionId, String

    orderTotal = _.sum products, (product) ->
      product.qty * product.details.price

    products = _.map products, (product) ->

      product.productName = product.details.name
      product.packagingDescription = product.details.packagingDescription
      product.packagingRefund = product.details.packagingRefund
      product.price = product.details.price

      delete product._id
      delete product.details

      product

    id = Orders.insert

      transationTotal: total
      user: userId
      orderTotal: orderTotal
      status: 'paid'
      transactionId: transactionId
      products: products
    if typeof id != 'string'
      return id

    sale =
      orderId: id
      deliveryDay: GetDeliveryDay()
      customer: userId 

    Sales.insert product

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
