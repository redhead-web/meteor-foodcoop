Meteor.methods
  "balanceCheckout": ->
    check @userId, String
    
    user = Meteor.user();
    items = Cart.Items.find(userId: @userId).fetch();
    total = _.reduce items, ((total, item) ->
      total + item.details.price * ((Meteor.settings.public.markup / 100) + 1) * item.qty
    ), 0
    
    
    if Roles.userIsInRole(@userId, 'allowNegativeBalance') or user.profile.balance > total
      data = 
        orderTotal: total
        cardAmount: 0
        balanceAmount: total
      creditUpdate = Meteor.users.update @userId,
        $inc: 'profile.balance': -total
      
      @unblock()
      Meteor.call "addFromCartToOrder", items, data
      
      
    else
      throw new Meteor.Error 401, "Sorry, you must have a balance greater than your cart's total to checkout with credit."
