# New And Improved Stocklevel Control

Meteor.methods
  
  '/cart/item/update': (id, new_qty, old_qty) ->
    check parseInt(new_qty), Number
    check parseInt(old_qty), Number
    check id, String
    
    deltaQty = parseInt(new_qty) - parseInt(old_qty)
    result = Cart.Items.update 
      _id: id
      userId: @userId
    ,
      $inc: qty: deltaQty
      
    if result is 1
      Meteor.users.update @userId,
        $set: 'profile.cart.status' : 'active'
      cartItem = Cart.Items.findOne(id)
      try
        Products.update
          _id: cartItem.productId
          'carted.user': @userId
          'stocklevel': $gte: deltaQty
        ,
          $inc: stocklevel: -deltaQty
          $set: 
            'carted.$.qty': new_qty
            'carted.$.timestamp': new Date()
      catch error
        Cart.Items.update 
          _id: id
          userId: @userId
        ,
          $inc: qty: -deltaQty
        console.log error
        throw new Meteor.Error 401, error.message, error.details
        

    
  
  updateCartQty: (id, productId, new_qty, old_qty) ->
    check parseInt(new_qty), Number
    check parseInt(old_qty), Number
    check id, String
    check productId, String
    self = this
    deltaQty = parseInt(new_qty) - parseInt(old_qty)
    if Meteor.user().profile.cart.status == 'active'
      
      result = Meteor.users.update {
        _id: this.userId
        'profile.cart.products._id': id
      }, {
        $set: 'profile.cart.status' : 'active'
        $inc: 'profile.cart.products.$.qty': deltaQty
      }
      
      if result > 0
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

    else throw new Meteor.Error 400, "Sorry, you can't edit your cart right now"
