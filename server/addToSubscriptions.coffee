Meteor.methods
  addToSubscriptions: (cart, transactionId, subscriptionId) ->
    userId = this.userId
    check transactionId, String

    orders = _.map cart.products, (product) ->
      product.status = cart.status
      product.last_modified = cart.last_modified
      product.productDetails = product.details
      product.user = userId

      if transactionId
        product.transactionId = transactionId
      else
        product.subscriptionId = subscriptionId

      delete product._id
      delete product.details

      product


    Subscriptions.insert order for order in orders

    Meteor.users.update {
      _id: userId
    }, {
      $set:
        'profile.cart.status': 'active'
      $unset:
        'profile.cart.products': ""
    }, (error) ->
      console.log error if error
      new Meteor.Error('cart update failed', error) if error
      'SUCCESSFULLY ADDED TO subscriptions'
