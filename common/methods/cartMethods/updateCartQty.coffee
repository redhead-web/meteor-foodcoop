# New And Improved Stocklevel Control

Meteor.methods

  '/cart/item/update': (id, new_qty, old_qty) ->
    unless old_qty
      old_qty = Cart.Items.findOne(id).qty
    check parseInt(new_qty), Number
    check parseInt(old_qty), Number
    check id, String

    deltaQty = parseInt(new_qty) - parseInt(old_qty)

    updateMod =
      $set: dateModified: new Date()
      $inc: qty: deltaQty

    result = Cart.Items.update
      _id: id
      userId: @userId
    ,
      updateMod

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
        if productResult == 0
          # check if product has a stocklevel
          product = Products.findOne {_id: cartItem.productId, stocklevel: $gte: 0}
          if product?
            #if the product exists but query failed, the new_qty is too great, undo the cart update by throwing an error
            throw new Error "Sorry! There aren't that many available.", 'updateCartQty.coffee'
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
