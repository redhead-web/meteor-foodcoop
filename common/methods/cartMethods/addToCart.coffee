Meteor.methods
  addToCart: (product, qty) ->

    userId = this.userId;

    check userId, String
    check product, Object
    check qty, Number

    if product.stocklevel && qty > product.stocklevel
      throw new Meteor.Error 401, "Insufficient Stock Sorry!", product.stocklevel - qty

    try
      result = Meteor.users.update {
        _id: userId
      }, {
        $set:
          'profile.cart.status' : 'active'
        $push:
          'profile.cart.products' :
            productId: product._id
            qty: qty
            details:
              producer: product.producer
              producerName: product.producerName
              producerCompanyName: product.producerCompanyName
              name: product.name
              price: product.price
              img: product.img
              minimumOrder: product.minimumOrder or undefined
              packagingRefund: product.packagingRefund or 0
              packagingDescription: product.packagingDescription or undefined
        }
    catch error
      console.log error
      new Meteor.Error 400, 'cart update failed', error.details
      return error

    if result > 0
      Products.update
        _id: product._id,
        stocklevel: $gte: qty
      ,
        $inc: stocklevel: -qty
        $push:
          carted:
            qty: qty
            user: userId
            timestamp: new Date()
      , (error, num) ->
        if error
          console.log "could not add item to cart because Product stocklevels errored"
          console.error error.details
          Meteor.users.update userId,
            $pull: 'profile.cart.products': productId: product._id
        if num is 0 and not product.stocklevel?
          console.log "Stocklevel not tracked on #{product.name}"
        else if num is 0 and product.stocklevel?
          Meteor.users.update userId,
            $pull: 'profile.cart.products': productId: product._id
          throw new Meteor.Error 401, "Insufficient Stock Sorry!", product.stocklevel - qty
    if result == 0
      throw new Meteor.Error 400, "no cart to put that product in"
    result
