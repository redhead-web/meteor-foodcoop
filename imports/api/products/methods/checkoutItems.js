import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

export function checkoutItems(data, delivery, userId, status) {
  new SimpleSchema({
    details: {
      type: Object,
      blackbox: true,
    },
    type: {
      type: String,
    }, nonce: {
      type: String,
    },
  }).validate(data);
  if (delivery) {
    new SimpleSchema({
      deliveryMethod: {
        type: Object,
      },
      'deliveryMethod._id': { type: String },
      'deliveryMethod.cost': { type: Number, decimal: true },
      'deliveryMethod.description': { type: String },
      'deliveryMethod.title': { type: String },
      address: {
        type: String,
      },
      deliveryDays: {
        type: [String],
      },
    }).validate(delivery);
  }
  check(userId, String);
  check(status, String);

  if (!Roles.userIsInRole(this.userId, 'admin') && !this.userId === userId) {
    throw new Meteor.Error('checkout.400', 'You do not have permission to checkout');
  }
  const items = Cart.Items.find({ userId }).fetch();
  const itemTotal = Markup(items).cartTotal();

  const order = {
    user: userId,
    status: 'un-paid',
    orderTotal: itemTotal,
    cardAmount: itemTotal, // will change if credit used
  };

  const braintreeData = {
    payment_method_nonce: data.nonce,
  };

  if (delivery) {
    order.orderTotal += delivery.deliveryMethod.cost * delivery.deliveryDays.length;
    order.cardAmount += delivery.deliveryMethod.cost * delivery.deliveryDays.length;
  }

  // Get user for braintree and to check account balance
  const user = Meteor.users.findOne(userId);

  braintreeData.customerId = user.customerId;
  const balanceAmount = user.profile.balance;

  if (balanceAmount > order.orderTotal) {
    order.cardAmount = 0;
    order.balanceAmount = order.orderTotal;
    Meteor.users.update(userId, { $inc: { 'profile.balance': -order.orderTotal } });
  } else {
    order.balanceAmount = balanceAmount;
  }

  if (balanceAmount !== 0 && order.orderTotal > balanceAmount) {
    order.cardAmount = order.orderTotal - balanceAmount;
    Meteor.users.update(userId, { $set: { 'profile.balance': 0 } });
  }

  braintreeData.total = order.cardAmount;

  const result = Meteor.call('braintreeTransaction2', braintreeData);

  if (result && result.success) {
    order.status = 'paid';
    order.transactionId = result.transaction.id;
    if (delivery) {
      Meteor.call('addDelivery', delivery, userId);
    }
    Meteor.call('addFromCartToOrder2', order, items, status);
  }
  return result;
}

Meteor.methods({
  checkoutItems,
});
