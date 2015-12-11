Meteor.methods
  removeFromCart: (id) ->
    userId = this.userId

    check id, String
    cartItem = _.find Meteor.users.findOne(this.userId).profile.cart.products, (product) ->
      return product._id == id

    check cartItem, Object
    check cartItem.qty, Number
    check cartItem.productId, String


    Meteor.users.update {
      _id: userId
    }, {
      $set:
        'profile.cart.status' : 'active'
      $pull:
        'profile.cart.products' : _id: id
      }, (error, num) ->
        error if error
        Products.update
          _id: cartItem.productId
          stocklevel: $exists: 1
        ,
          $inc: stocklevel: cartItem.qty
          $pull: 'carted': user: userId 
        , (error, num) ->
          Meteor.error error if error
          'SUCCESSFULLY ADDED TO CART'
