Meteor.methods
  removeFromCart: (id) ->
    Meteor.users.update {
      _id: this.userId
    }, {
      $set:
        'profile.cart.status' : 'active'
      $pull:
        'profile.cart.products' :
          _id: id
      }, (error, num) ->
        error if error
        console.log num
        'SUCCESSFULLY ADDED TO CART'
