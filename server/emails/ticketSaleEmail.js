import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { Mailer } from 'meteor/lookback:emails';

function ticketSaleEmail(ticketData, event) {
  return Mailer.send({
    to: `${ticketData.name} <${ticketData.email}>`,
    replyTo: `${Meteor.settings.email.name} <${Meteor.settings.email.address}>`,
    subject: `Your Tickets for the ${event.title}`,
    template: 'ticketSale',
    data: {
      event,
      recipient: {
        name: ticketData.name,
        qty: ticketData.qty,
        email: ticketData.email,
        timestamp: moment().toDate(),
      },
    },
  });
}

Meteor.methods({ ticketSaleEmail });
