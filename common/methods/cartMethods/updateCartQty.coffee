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
      $set: dateModified: new Date()
      
    if result is 1
      Meteor.users.update @userId,
        $set: 'profile.cart.status' : 'active'
      cartItem = Cart.Items.findOne(id)
      
      # TODO Validate stocklevel
      try
        productResult = Products.update
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
          $set: dateModified: new Date()
        console.log error
        throw new Meteor.Error 401, error.message, error.details
    return result
        

