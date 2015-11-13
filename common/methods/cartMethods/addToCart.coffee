Meteor.methods
  addToCart: (product, qty) ->

    userId = this.userId;

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
              name: product.name
              price: product.price
              img: product.img
              thumb: product.thumb
              minimumOrder: product.minimumOrder or undefined
              wholeSaleOnly: product.wholeSaleOnly or undefined
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
        if num is 0
          console.log "Stocklevel not tracked on #{product.name}"
    if result == 0
      throw new Meteor.Error 400, "no cart to put that product in"
    result
