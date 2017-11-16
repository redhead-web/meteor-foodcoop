import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import moment from 'moment-timezone';

export default function accountsTopUp(data) {
  check(data.amount, Number);
  check(data.data.nonce, String);

  if (data.amount < (Meteor.settings.topUpMinimum || 50)) {
    throw new Meteor.Error('Accounts.topUp', 'Transaction failed sorry, please check your details and try again.');
  }

  const user = Meteor.users.findOne(this.userId);

  const result = Meteor.call('braintreeTransaction', {
    total: data.amount,
    payment_method_nonce: data.data.nonce,
    customerId: user.customerId,
    fees: false,
  });

  if (result && result.success) {
    try {
      Meteor.users.update(this.userId, { $inc: { 'profile.balance': data.amount } });
    } catch (e) {
      throw new Meteor.Error('Accounts.topUp', 'Failed to update your account balance sorry.');
    }

    Meteor.call('/email/topUpReceipt', {
      amount: data.amount,
      // user has not been loaded since balance was updated
      balance: user.profile.balance + data.amount,
      name: user.profile.name,
      creditCard: {
        maskedNumber: result.transaction.creditCard && result.transaction.creditCard.maskedNumber ?
          result.transaction.creditCard.maskedNumber : null,
        img: result.transaction.creditCard && result.transaction.creditCard.imageUrl ?
          result.transaction.creditCard.imageUrl : null,
      },
      paypal: {
        email: result.transaction.paypal && result.transaction.paypal.payerEmail ?
          result.transaction.paypal.payerEmail : null,
        img: result.transaction.paypal && result.transaction.paypal.imageUrl ?
          result.transaction.paypal.imageUrl : null,
      },
      createdAt: moment(result.transaction.createdAt).format('llll'),
    });
    return result;
  }
  throw new Meteor.Error('Accounts.topUp', 'Transaction failed sorry, please check your details and try again.');
}

Meteor.methods({ 'Accounts.topUp': accountsTopUp });
