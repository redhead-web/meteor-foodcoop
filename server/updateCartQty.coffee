Meteor.methods
  updateCartQty: (qty, id) ->
    if Meteor.user().profile.cart.status == 'active'
      Meteor.users.update {
        _id: this.userId
        'profile.cart.products._id': id
      }, {
        $set:
          'profile.cart.products.$.qty':qty
          'profile.cart.status' : 'active'
      }, (error) ->
        return error if error
        return 'SUCCESSFULLY UPDATED CART'
    else "SORRY CAN'T UPDATE CART RIGHT NOW"
