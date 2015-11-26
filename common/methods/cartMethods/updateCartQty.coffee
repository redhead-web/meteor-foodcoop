# New And Improved Stocklevel Control

Meteor.methods
  updateCartQty: (id, productId, new_qty, old_qty) ->
    check parseInt(new_qty), Number
    check parseInt(old_qty), Number
    check id, String
    check productId, String
    self = this
    deltaQty = parseInt(new_qty) - parseInt(old_qty)
    if Meteor.user().profile.cart.status == 'active'
      Meteor.users.update {
        _id: this.userId
        'profile.cart.products._id': id
      }, {
        $set: 'profile.cart.status' : 'active'
        $inc: 'profile.cart.products.$.qty': deltaQty
      }, (error) ->
        return error if error
        Products.update
          _id: productId
          'carted.user': self.userId
          'stocklevel': $gte: deltaQty
        ,
          $inc: stocklevel: -deltaQty
          $set: 'carted.$.qty': new_qty,
          'carted.$.timestamp': new Date()
        , (error, num) ->
          if error
            Meteor.users.update
              _id: self.userId
              'profile.cart.products._id': id
            ,
              $inc: 'profile.cart.products.$.qty': -deltaQty
            throw new Meteor.Error 401, "Sorry cart update failed", error
          else if num = 0
            product = Products.findOne productId
            unless product?
              Meteor.users.update
                _id: self.userId
                'profile.cart.products._id': id
              ,
                $inc: 'profile.cart.products.$.qty': -deltaQty
              throw new Meteor.Error 401, "Sorry cart update failed", error

        return 'SUCCESSFULLY UPDATED CART'
    else "SORRY CAN'T UPDATE CART RIGHT NOW"
