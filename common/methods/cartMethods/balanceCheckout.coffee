Meteor.methods
  "balanceCheckout": (customerId, delivery, status) ->

    check customerId, String

    customer = Meteor.users.findOne customerId

    # admin or self only
    if @userId == customerId or Roles.userIsInRole @userId, 'admin'

      items = Cart.Items.find(userId: customerId).fetch();
      itemTotal = Markup(items).cartTotal()

      order =
        orderTotal: itemTotal
        cardAmount: 0
        balanceAmount: itemTotal
        user: customerId
        status: 'un-paid'

      if delivery
        order.orderTotal += delivery.deliveryMethod.cost * delivery.deliveryDays.length;
        order.balanceAmount += delivery.deliveryMethod.cost * delivery.deliveryDays.length;

      if Roles.userIsInRole(customerId, 'allowNegativeBalance') or customer.profile.balance >= order.orderTotal
        Meteor.users.update customerId,
          $inc: 'profile.balance': -order.orderTotal

        order.status = 'paid'

        @unblock()

        if delivery
          Meteor.call 'addDelivery', delivery, customerId

        Meteor.call "addFromCartToOrder2", order, items, status

      else
        throw new Meteor.Error 401, "Sorry! Insufficient Balance"
    else
      throw new Meteor.Error 401, "Forbidden to checkout for that customer"
