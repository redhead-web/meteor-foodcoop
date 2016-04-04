Meteor.methods
  "balanceCheckout": (customerId, pos) ->
    
    check customerId, String
    
    if pos == 'true'
      deliveryDay = moment().day(Meteor.settings.public.deliveryDayOfWeek).startOf('day').toDate()
    
    customer = Meteor.users.findOne customerId
    
    # admin or self only
    if @userId == customerId or Roles.userIsInRole @userId, 'admin' 
    
      items = Cart.Items.find(userId: customerId).fetch();
      total = Markup(items).cartTotal()
    
    
      if Roles.userIsInRole(customerId, 'allowNegativeBalance') or customer.profile.balance > total
        data = 
          orderTotal: total
          cardAmount: 0
          balanceAmount: total
        creditUpdate = Meteor.users.update customerId,
          $inc: 'profile.balance': -total
        
        # use deliveryDay if it's defined
        if deliveryDay then data.deliveryDay = deliveryDay
        
        @unblock()
        self = this
        self.userId = customerId
        Meteor.call.call self, "addFromCartToOrder", items, data
      
      
      else
        throw new Meteor.Error 401, "Sorry! Insufficient Balance"
    else
      throw new Meteor.Error 401, "Forbidden to checkout for that customer"
