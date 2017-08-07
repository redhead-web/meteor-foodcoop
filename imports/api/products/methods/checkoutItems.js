/* globals Markup, Cart */
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

export function checkoutItems(data, delivery, userId, status) {
  new SimpleSchema({
    details: {
      type: Object,
      blackbox: true,
      optional: true,
    },
    type: {
      type: String,
    },
    nonce: {
      type: String,
      optional: true,
    },
  }).validate(data);

  if (data.type !== 'cash' && !data.nonce) {
    throw new Meteor.Error('checkoutItems.401', 'Can\'t checkout items without a credit card');
  }

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
  const itemTotal = Markup(items).cartTotal(); // eslint-disable-line new-cap
  const paymentMethodAmount = data.type === 'cash' ? 'cashAmount' : 'cardAmount';
  const order = {
    user: userId,
    status: 'paid',
    orderTotal: itemTotal,
    [paymentMethodAmount]: itemTotal, // will change if credit used
  };

  if (delivery) {
    order.orderTotal += delivery.deliveryMethod.cost * delivery.deliveryDays.length;
    order[paymentMethodAmount] += delivery.deliveryMethod.cost * delivery.deliveryDays.length;
  }

  // Get user for braintree and to check account balance
  const user = Meteor.users.findOne(userId);
  const balanceAmount = user.profile.balance;

  if (balanceAmount > order.orderTotal) {
    order[paymentMethodAmount] = 0;
    order.balanceAmount = order.orderTotal;
    Meteor.users.update(userId, { $inc: { 'profile.balance': -order.orderTotal } });
  } else {
    order.balanceAmount = balanceAmount;
  }

  if (balanceAmount !== 0 && order.orderTotal > balanceAmount) {
    order[paymentMethodAmount] = order.orderTotal - balanceAmount;
    Meteor.users.update(userId, { $set: { 'profile.balance': 0 } });
  }

  const braintreeData = {
    payment_method_nonce: data.nonce,
    total: order.cardAmount,
    customerId: user.customerId,
    fees: true,
  };


  if (!this.isSimulation) {
    if (data.type !== 'cash') {
      const result = Meteor.call('braintreeTransaction', braintreeData);
      if (result && result.success) {
        order.transactionId = result.transaction.id;
      } else {
        console.log(result);
        throw new Meteor.Error('PaymentFailed', 'payment failed. Try again or try a different card');
      }
    }
  }

  if (delivery) {
    Meteor.call('addDelivery', delivery, userId);
  }

  Meteor.call('addFromCartToOrder2', order, items, status);

  return true;
}

Meteor.methods({
  checkoutItems,
});
