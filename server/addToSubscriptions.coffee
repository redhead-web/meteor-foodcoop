Meteor.methods
  addToSubscriptions: (cart, transactionId) ->

    check transactionId, String

    cartProducts = _.map cart.products, (product) ->
      product.status = cart.status
      product.last_modified = cart.last_modified
      product.productDetails = product.details
      product.user = this.userId
      product.transactionId = transactionId

      delete product._id
      delete product.details

      product


    Subscriptions.insert order for order in cartProducts

    Meteor.user.update {
      _id: this.userId
    }, {
      $set:
        'profile.cart.status': 'active'
        'profile.cart.last_modified': new Date
      $unset:
        'profile.cart.products': ""
    }, (error) ->
      console.log error if error
      new Meteor.Error('cart update failed', error) if error
      'SUCCESSFULLY ADDED TO subscriptions'
