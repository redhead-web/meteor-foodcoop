# New And Improved Stocklevel Control

Meteor.methods
  updateCartQty: (id, new_qty, old_qty) ->
    check qty, Number
    check id, String
    self = this
    deltaQty = new_qty - old_qty
    if Meteor.user().profile.cart.status == 'active'
      Meteor.users.update {
        _id: this.userId
        'profile.cart.products._id': id
      }, {
        $set: 'profile.cart.status' : 'active'
        $inc: 'profile.cart.products.$.qty': deltaQty
      }, (error) ->
        return error if error
        Product.update
          _id: id
          'carted.user': self.userId
          'stocklevel': $gte: deltaQty
        ,
          $inc: qty: -deltaQty
          $set: 'carted.$.qty': new_qty,
          timestamp: new Date()
        , (error) ->
          if error
            Meteor.users.update
              _id: self.userId
              'profile.cart.products._id': id
            ,
              $inc: 'profile.cart.products.$.qty': -deltaQty

        return 'SUCCESSFULLY UPDATED CART'
    else "SORRY CAN'T UPDATE CART RIGHT NOW"
