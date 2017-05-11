import { Meteor } from 'meteor/meteor';
import { Mailer } from 'meteor/lookback:emails';
import getEmailAddress from '../helpers/getEmailAddress';

export default function topUpReceipt(data) {
  return Mailer.send({
    replyTo: `${Meteor.settings.email.name} <${Meteor.settings.email.address}>`,
    to: getEmailAddress(this.userId),
    subject: 'Thanks for Topping up your Food Co-op Account',
    template: 'topUpReceipt',
    data,
  });
}

Meteor.methods({ '/email/topUpReceipt': topUpReceipt });
