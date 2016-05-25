import _ from 'meteor/stevezhu:lodash';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

import { Events } from './collection';

function getContactEmail(user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;

  return null;
}

export function buyTicket(eventId, qty, btData) {
  check(eventId, String);
  check(qty, Number);
  check(btData, Object);

  if (!this.userId) {
    throw new Meteor.Error(403, 'You must be logged in to RSVP');
  }

  const party = Events.findOne(eventId)

  if (!party) {
    throw new Meteor.Error(404, 'No such event');
  }

  if (party.ticketsRemaining < qty) {
    throw new Meteor.Error(401, "Sorry, insufficient tickets remaining")
  }

  if (party.ticketPrice) {
    // TODO: buy ticket with braintree
  }

  const isUserComing = _.findWhere(party.attendees, {
    user: this.userId
  });

  if (!isUserComing) {
    Events.update(eventId, {
      $push: {
        attendees: {
          qty,
          user: this.userId
        }
      }, $inc: {
        ticketsRemaining: -qty
      }
    });
  } else {
    Events.update({
      _id: eventId,
      'attendees.user': userId
    }, {
      $set: {
        'attendees.$.qty': qty
      }
    })
  }
}

export function rsvp(eventId, rsvp) {
  check(eventId, String);
  check(rsvp, String);

  if (!this.userId) {
    throw new Meteor.Error(403, 'You must be logged in to RSVP');
  }

  if (!_.contains(['yes', 'no', 'maybe'], rsvp)) {
    throw new Meteor.Error(400, 'Invalid RSVP');
  }

  const party = Events.findOne({
    _id: eventId,
    $or: [{
      // is public
      $and: [{
        public: true
      }, {
        public: {
          $exists: true
        }
      }]
    },{
      // is owner
      $and: [{
        owner: this.userId
      }, {
        owner: {
          $exists: true
        }
      }]
    }, {
      // is invited
      $and: [{
        invited: this.userId
      }, {
        invited: {
          $exists: true
        }
      }]
    }]
  });

  if (!party) {
    throw new Meteor.Error(404, 'No such party');
  }

  const hasUserRsvp = _.findWhere(party.rsvps, {
    user: this.userId
  });

  if (!hasUserRsvp) {
    // add new rsvp entry
    Events.update(eventId, {
      $push: {
        attendees: {
          rsvp,
          user: this.userId
        }
      }, $inc: {
        ticketsRemaining: -btData.ticketNumber
      }
    });
  } else {
    // update rsvp entry
    const userId = this.userId;
    Events.update({
      _id: eventId,
      'rsvps.user': userId
    }, {
      $set: {
        'rsvps.$.rsvp': rsvp
      }
    });
  }
}

Meteor.methods({
  rsvp,
  buyTicket
});
