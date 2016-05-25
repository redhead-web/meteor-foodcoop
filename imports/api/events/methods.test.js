import {rsvp} from './methods'
import {Events} from './collection'
import { expect } from 'meteor/practicalmeteor:chai';

import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  describe('Events / Methods', function() {
    describe('rsvp', () => {
      function loggedIn(userId = 'userId') {
        return {
          userId
        };
      }

      // it('should be called from Method', () => {
      //   spyOn(rsvp, 'apply');
      //
      //   try {
      //     Meteor.call('rsvp');
      //   } catch (e) {}
      //
      //   expect(rsvp.apply).toHaveBeenCalled();
      // });

      it('should fail on missing partyId', () => {
        expect(() => {
          rsvp.call({});
        }).to.throw();
      });

      it('should fail on missing rsvp', () => {
        expect(() => {
          rsvp.call({}, 'partyId');
        }).to.throw();
      });

      it('should fail if not logged in', () => {
        expect(() => {
          rsvp.call({}, 'partyId', 'rsvp');
        }).to.throw(/403/);
      });


      // ['yes', 'maybe', 'no'].forEach((answer) => {
      //   it(`should pass on '${answer}'`, () => {
      //     expect(() => {
      //       rsvp.call(loggedIn(), 'partyId', answer);
      //     }).not.toThrowError(/400/);
      //   });
      // });

      // TODO: more tests
    });
  })
}
