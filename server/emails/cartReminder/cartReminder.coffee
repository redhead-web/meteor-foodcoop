cartReminder = () ->
  cartItems = Cart.Items.find {}, fields: {userId: 1, reminderLevel: 1}
  .map (item) ->
    user = Meteor.users.findOne(item.userId);

    result = Mailer.send
      replyTo: "#{Meteor.settings.email.name} <#{Meteor.settings.email.address}>"
      to: "#{user.profile.name} <#{user.emails[0].address}>"
      subject: "Items are still in your cart"
      template: "cartReminder"
      data: {
        name: user.profile.name
      }

    Cart.Items.update item._id, $inc: reminderLevel: 1
    return
  return

Meteor.methods
  '/email/cartReminder': cartReminder

exports.cartReminder = cartReminder;
