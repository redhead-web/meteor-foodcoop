import { groupBy } from 'lodash'

export cartReminder = () ->
  cartItems = Cart.Items.find {}
  .fetch()

  carts = groupBy(cartItems, (item) -> item.userId)

  Object.keys(carts).forEach (userId) ->
    user = Meteor.users.findOne(userId)

    Mailer.send
      replyTo:"#{Meteor.settings.email.name} <#{Meteor.settings.email.address}>"
      to: "#{user.profile.name} <#{user.emails[0].address}>"
      subject: "Forgot to checkout? Items still in your cart"
      template: "cartReminder"
      data: {
        name: user.profile.name
        items: carts[userId]
      }
  return

export increaseCartReminderLevel = () ->
  console.log('incrementing the cart levels')
  Cart.Items.update({}, { $inc: reminderLevel: 1 }, { multi: true })

Meteor.methods
  '/email/cartReminder': cartReminder
