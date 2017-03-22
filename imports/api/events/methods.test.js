/* eslint-env mocha */

import { buyTickets } from './methods';

import { Events } from './collection';
import { expect } from 'meteor/practicalmeteor:chai';

import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  describe('Events / Methods', () => {
    describe('buyTickets', () => {
      function loggedIn(userId = 'userId') {
        return {
          userId,
        };
      }

      const testTicketData = { qty: 1, name: 'sean stanley', email: 'test@test.com' };

      const testTransactionData = { nonce: 'fake-valid-visa-nonce' };

      const failNonce = 'fake-processor-declined-visa-nonce';

      let id;

      beforeEach(() => {
        resetDatabase();
        id = Events.insert({
          title: 'Test Event',
          date: new Date(),
        });
      });

      it('should fail on missing eventId', () => {
        expect(() => {
          buyTickets.call({});
        }).to.throw();
      });

      it('should fail on missing ticketData', () => {
        expect(() => {
          buyTickets.call({}, 'eventId');
        }).to.throw();
      });

      it('should not fail if missing transaction nonce', () => {
        expect(() => {
          buyTickets.call({}, id, testTicketData, {});
        }).not.to.throw();
      });

      // it('should not fail with valid arguments', () => {
      //   expect(() => {
      //     buyTickets.call({}, id, testTicketData, testTransactionData);
      //   }).to.not.throw();
      // });
      //
      // it('should not fail with invalid nonce if no ticket price for event', () => {
      //   const td = { nonce: failNonce };
      //   expect(() => {
      //     buyTickets(id, testTicketData, td);
      //   }).not.to.throw();
      // });
      //
      // it('should fail with invalid nonce if ticket price for event', () => {
      //   const td = { nonce: failNonce };
      //   Events.update(id, { $set: { ticketPrice: 30 } });
      //   expect(() => {
      //     buyTickets.call({ unblock() { return null; } }, id, testTicketData, td);
      //   }).not.to.throw();
      // });

      // TODO: more tests
    });

    // describe('eventTodayReminder', () => {
    //
    //   beforeEach(()=> {
    //     resetDatabase();
    //     let attendees = []
    //     for (let i = 0; i < 6; i++) {
    //       attendees.push({
    //         name: faker.name.findName(),
    //         email: faker.internet.email(),
    //         timestamp: new Date(),
    //         qty: faker.random.number({ min: 1, max: 20 })
    //       })
    //     }
    //
    //     Events.insert({
    //       title: "Test Event",
    //       date: new Date(),
    //       attendees
    //     })
    //   })
    //
    //   it('should not fail to find attendees', () => {
    //     expect(() => {
    //       eventTodayReminder()
    //     }).not.to.throw();
    //   })
    // })
  });
}
