/* globals Braintree, BrainTreeConnect */
import { _ } from 'meteor/stevezhu:lodash';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Events } from './collection';

let gateway = null;

if (Meteor.isServer) {
  const environment = process.env.METEOR_ENVIRONMENT === 'production' ? Braintree.Environment.Production : Braintree.Environment.Sandbox;

  gateway = BrainTreeConnect({
    environment,
    merchantId: Meteor.settings.BRAIN_TREE.MERCHANT_ID,
    publicKey: Meteor.settings.BRAIN_TREE.PUBLIC_KEY,
    privateKey: Meteor.settings.BRAIN_TREE.PRIVATE_KEY,
  });
}

// function getContactEmail(user) {
//   if (user.emails && user.emails.length) { return user.emails[0].address; }
//
//   return null;
// }

export function buyTickets(eventId, ticketData, transactionData) {
  let result = { transaction: { id: '' } };

  check(eventId, String);
  check(ticketData, {
    qty: Match.Integer,
    name: String,
    email: String,
  });

  const event = Events.findOne(eventId);

  if (!event) {
    throw new Meteor.Error(404, 'No such event');
  }

  if (event.ticketPrice) {
    check(transactionData, Match.ObjectIncluding({ nonce: String }));
  }

  if (event.ticketsRemaining < ticketData.qty) {
    throw new Meteor.Error(401, `Sorry, only ${event.ticketsRemaining} tickets left.`);
  }

  const isUserComing = _.findWhere(event.attendees, {
    email: ticketData.email,
  });

  if (event.ticketPrice && !this.isSimulation) {
    // TODO: buy ticket with braintree
    const config = {
      amount: (ticketData.qty * event.ticketPrice).toFixed(2),
      paymentMethodNonce: transactionData.nonce,
      options: { submitForSettlement: true },
    };

    if (this.userId) {
      const user = Meteor.users.findOne(this.userId);
      config.customerId = user.customerId;
      config.options.storeInVaultOnSuccess = true;
    }

    this.unblock();
    result = gateway.transaction.sale(config);
    if (!result.success) {
      console.log(result);
      if (result.errors.deepErrors() > 0) {
        throw new Meteor.Error(500, 'Something went wrong, please check your payment method and try again.', result.errors);
      } else if (result.message) {
        throw new Meteor.Error(500, `${result.message}`);
      } else if (result.transaction && result.transaction.processorSettlementResponseCode) {
        throw new Meteor.Error(500, `${result.transaction.processorSettlementResponseCode}: ${result.transaction.processorSettlementResponseText}`);
      } else {
        throw new Meteor.Error(500, 'Something went wrong, please check your payment method and try again.', result);
      }
    }
  }

  if (!isUserComing) {
    Events.update(eventId, {
      $push: {
        attendees: {
          qty: ticketData.qty,
          user: this.userId,
          name: ticketData.name,
          email: ticketData.email,
          transactionIds: [result.transaction.id],
          timestamp: new Date(),
        },
      },
      $inc: {
        ticketsRemaining: -ticketData.qty,
      },
    });
  } else {
    Events.update({
      _id: eventId,
      'attendees.email': ticketData.email,
    }, {
      $inc: {
        'attendees.$.qty': ticketData.qty,
        ticketsRemaining: -ticketData.qty,
      },
      $set: {
        'attendees.$.timestamp': new Date(),
      },
      $push: {
        'attendees.$.transactionIds': result.transaction.id,
      },
    });
  }
  // TODO: send ticket email
  const sent = Meteor.call('ticketSaleEmail', ticketData, event);

  if (!sent) console.error(`Event Reminder Message failed to send to ${ticketData.name} at ${ticketData.email}`);

  return { result };
}

Meteor.methods({
  buyTickets,
});
