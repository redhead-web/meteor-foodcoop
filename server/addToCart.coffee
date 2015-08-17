Meteor.methods
  addToCart: (product, qty, start_date, end_date) ->
    indefinate = true unless end_date?

    Meteor.users.update {
      _id: this.userId
    }, {
      $set:
        'profile.cart.last_modified' : new Date
        'profile.cart.status' : 'active'
      $push:
        'profile.cart.products' :
          productId: product._id
          qty: qty
          start_date: start_date
          end_date: end_date
          indefinate: indefinate
          details:
            name: product.name
            price: product.price
            thumb: product.thumb
            wholeSaleOnly: product.wholeSaleOnly
          #  description: product.description
      }, (error) ->
        console.log error
        new Meteor.Error('cart update failed', error) if error
        return 'SUCCESSFULLY ADDED TO CART'
