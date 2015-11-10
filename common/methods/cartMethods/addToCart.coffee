Meteor.methods
  addToCart: (product, qty, start_date, end_date) ->

    self = this;

    Meteor.users.update {
      _id: this.userId
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
            minimumOrder: product.minimumOrder
            wholeSaleOnly: product.wholeSaleOnly
            packagingRefund: product.packagingRefund or 0
            packagingDescription: product.packagingDescription
      }, (error) ->
        if error
          console.log error
          new Meteor.Error('cart update failed', error)
          return
        Products.update
          _id: product._id,
          stocklevel: $gte: qty
        ,
          $inc: stocklevel: -qty
          $push:
            carted:
              qty: qty
              user: self.userId
              timestamp: new Date()
        , (error, num) ->
          if error
            Meteor.users.update self.userId,
              $pull: 'profile.cart.products': productId: product._id
          if num is 0
            console.log "Stocklevel not tracked on #{product.name}"

        return 'SUCCESSFULLY ADDED TO CART'
