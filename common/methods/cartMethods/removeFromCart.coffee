Meteor.methods    
  removeFromCart: (id) ->
    if Roles.userIsInRole @userId, 'admin'
      Cart.Items.remove(id)
    else
      throw new Meteor.Error 401, "you don't have permission to call this method"
