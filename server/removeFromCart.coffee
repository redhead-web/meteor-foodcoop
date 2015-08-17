Meteor.methods
  removeFromCart: (id) ->
    Meteor.users.update {
      _id: this.userId
    }, {
      $set:
        'profile.cart.last_modified' : new Date
        'profile.cart.status' : 'active'
      $pull:
        'profile.cart.products' :
          _id: id
      }, (error) ->
        return error if error
        return 'SUCCESSFULLY ADDED TO CART'
