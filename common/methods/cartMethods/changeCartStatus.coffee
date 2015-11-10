Meteor.methods
  cartStatus: (status) ->
    Meteor.users.update {
      _id: this.userId
    }, {
      $set:
        'profile.cart.status' : status
    }, (err) ->
      err if err
      status
      
