/* eslint-env mocha */
/* globals Cart, Markup */

import faker from 'faker';
import spies from 'chai-spies';
import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';
import { expect, chai } from 'meteor/practicalmeteor:chai';
import { Roles } from 'meteor/alanning:roles';


import { resetDatabase } from 'meteor/xolvio:cleaner';
import { checkoutItems } from './checkoutItems';
import '../../../../common/lib/markupCalculator';

chai.use(spies);

// Setup mock data
Factory.define('user', Meteor.users, {
  emails: () => [
    { address: faker.internet.email() },
  ],
  profile: () => ({
    name: faker.name.findName(),
    companyName: faker.company.companyName(),
    customerNumber: 16,
      // lastOrder: [Factory.get('product'), Factory.get('product'), Factory.get('product')],
      // favourites: [Factory.get('product'), Factory.get('product')]
  }),
});

Factory.define('cartItem', Cart.Items, {
  userId: Factory.get('user'),
  productId: 'someId',
  details: {
    price: 10,
  },
  qty: 1,
});

// Setup mock meteor methods
Meteor.methods({
  braintreeTransaction() {
    return { success: true, transaction: { id: 'someId' } };
  },
  addFromCartToOrder2() {
    return true;
  },
});

const fakeCheckoutData = {
  details: {},
  type: 'card',
  nonce: 'fake-valid-visa-nonce',
};

const fakeDeliveryData = {
  deliveryMethod: {
    _id: 'deliveryId',
    cost: 6,
    description: faker.lorem.sentence(),
    title: faker.lorem.word(),
  },
  address: faker.address.streetAddress(),
  deliveryDays: ['2017-03-10T04:01:40+00:00'],
};


// Setup mock data
describe('Checkout Items Method', () => {
  beforeEach(() => {
    resetDatabase();
  });

  describe('Arguments', () => {
    it('should error when called with no arguments', () => {
      expect(() => {
        checkoutItems();
      }).to.throw();
    });

    it('should error when called with incorrect data', () => {
      expect(() => {
        checkoutItems({}, null, 'userId', 'undelivered');
      }).to.throw();
    });

    it('should check if the current user is the admin', () => {
      // const admin = Factory.create('user');
      // Roles.addUsersToRoles(admin._id, 'admin');
      const user = Factory.create('user');
      chai.spy.on(Roles, 'userIsInRole');
      expect(() => {
        checkoutItems.call({ userId: user._id }, fakeCheckoutData, null, 'testId', 'undelivered');
      }).to.throw();
      expect(Roles.userIsInRole).to.have.been.called.with(user._id);
    });

    it('should be able to checkout for someone else if the admin is logged in', () => {
      const admin = Factory.create('user');
      Roles.addUsersToRoles(admin._id, 'admin');
      const user = Factory.create('user');
      chai.spy.on(Roles, 'userIsInRole');
      expect(() => {
        checkoutItems.call({ userId: admin._id }, fakeCheckoutData, null, user._id, 'collected');
      }).to.not.throw();
      expect(Roles.userIsInRole).to.have.been.called.with(admin._id);
    });

    it('should not error with valid data', () => {
      const user = Factory.create('user');
      expect(() => {
        checkoutItems.call({ userId: user._id }, fakeCheckoutData, null, user._id, 'undelivered');
      }).to.not.throw();
    });

    it('should not error with valid data and a delivery', () => {
      const user = Factory.create('user');
      expect(() => {
        checkoutItems.call(
          { userId: user._id },
          fakeCheckoutData,
          fakeDeliveryData,
          user._id,
          'undelivered'
        );
      }).to.not.throw();
    });
  });

  describe('price arithmetic', () => {
    it('balance (8) > 0 and balance (8) < cart total (11)', () => {
      const user = Factory.create('user', {
        profile: {
          balance: 8,
          name: faker.name.findName(),
          companyName: faker.company.companyName(),
          customerNumber: 16,
        },
      });

      Factory.create('cartItem', { userId: user._id });
      expect(user.profile.balance).to.equal(8);
      checkoutItems.call({ userId: user._id }, fakeCheckoutData, null, user._id, 'undelivered');
      expect(Meteor.users.findOne(user._id).profile.balance).to.equal(0);
    });
    it('balance (20) > 0 and balance (20) > cart total (11)', () => {
      const user = Factory.create('user', {
        profile: {
          balance: 20,
          name: faker.name.findName(),
          companyName: faker.company.companyName(),
          customerNumber: 16,
        },
      });
      Factory.create('cartItem', { userId: user._id });
      expect(user.profile.balance).to.equal(20);
      checkoutItems.call({ userId: user._id }, fakeCheckoutData, null, user._id, 'undelivered');
      expect(Meteor.users.findOne(user._id).profile.balance).to.equal(9);
    });
  });
});
