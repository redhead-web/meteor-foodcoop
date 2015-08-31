Meteor.methods
  productChange: (product) ->
    Meteor.users.update({'profile.cart.status': 'active', 'profile.cart.products._id': product._id}, {
      $set : {'profile.cart.products.$.details': {
        name: product.name,
        description: product.description,
        price: product.price,
        thumb: product.thumb
      } }
    })
