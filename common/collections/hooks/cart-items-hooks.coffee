Cart.Items.after.remove (userId, cartItem) ->
  console.log(userId)
  if Meteor.isServer
    Products.update cartItem.productId,
      $inc: stocklevel: cartItem.qty
      $pull:
        'carted':
          user: cartItem.userId
