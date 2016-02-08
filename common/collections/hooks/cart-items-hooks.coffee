Cart.Items.after.remove (userId, cartItem) ->
  if Meteor.isClient
    Products.update cartItem.productId,
      $inc: stocklevel: cartItem.qty
      $pull: 
        'carted': 
          user: userId