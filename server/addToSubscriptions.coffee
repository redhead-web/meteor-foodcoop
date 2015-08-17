Meteor.methods
  addToSubscriptions: (cart) ->

    cartProducts = _.map cart.products, (product) ->
      product.status = cart.status
      product.last_modified = cart.last_modified
      product.productDetails = product.details

      delete product._id
      delete product.details

      product

    Meteor.users.update {
      _id: this.userId
    }, {
      $set:
        'profile.cart.status': 'active'
        'profile.cart.last_modified': new Date
      $push:
        'profile.subscriptions' :
          $each: cartProducts
      $unset:
        'profile.cart.products': ""
    }, (error) ->
      console.log error if error
      new Meteor.Error('cart update failed', error) if error
      'SUCCESSFULLY ADDED TO subscriptions'
