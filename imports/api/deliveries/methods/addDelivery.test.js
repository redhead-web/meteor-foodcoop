/* eslint-env mocha */


import faker from 'faker';
import { Factory } from 'meteor/dburles:factory';
import { Deliveries } from '../collection';
import { Meteor } from 'meteor/meteor';
import { expect, chai } from 'meteor/practicalmeteor:chai';
import spies from 'chai-spies';

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

import { resetDatabase } from 'meteor/xolvio:cleaner';

import { addDelivery } from './addDelivery';

// Setup mock data
describe('Add Delivery Method', () => {
  beforeEach(() => {
    resetDatabase();
  });

  it('should be called from Method', () => {
    chai.spy.on(addDelivery, 'apply');
    Meteor.call('addDelivery', { deliveryDays: [] }, 'userId');
    expect(addDelivery.apply).to.have.been.called();
  });

  it('should fail to insert a delivery when called with no arguments', () => {
    expect(() => {
      addDelivery();
    }).to.throw();
  });

  it('should fail to insert a delivery when called with no userId', () => {
    const fakeDeliveryData = {
      address: faker.address.streetAddress(),
      deliveryMethod: {
        cost: faker.commerce.price(),
        _id: faker.lorem.word(),
        title: faker.lorem.word(),
      },
      deliveryDays: [new Date()],
    };
    expect(() => {
      addDelivery(fakeDeliveryData);
    }).to.throw();
  });

  it('should successfully insert a delivery for a user with a google maps address', () => {
    const user = Factory.create('user');
    const fakeDeliveryData = {
      address: {
        formatted_address: faker.address.streetAddress(),
      },
      deliveryMethod: {
        cost: faker.commerce.price(),
        _id: faker.lorem.word(),
        title: faker.lorem.word(),
      },
      deliveryDays: [new Date()],
    };
    chai.spy.on(Deliveries, 'insert');
    addDelivery(fakeDeliveryData, user._id);
    expect(Deliveries.insert).to.have.been.called();
  });

  it('should successfully insert a delivery for a user with an old google maps address', () => {
    const user = Factory.create('user');
    const fakeDeliveryData = {
      address: {
        formattedAddress: faker.address.streetAddress(),
      },
      deliveryMethod: {
        cost: faker.commerce.price(),
        _id: faker.lorem.word(),
        title: faker.lorem.word(),
      },
      deliveryDays: [new Date()],
    };
    chai.spy.on(Deliveries, 'insert');
    addDelivery(fakeDeliveryData, user._id);
    expect(Deliveries.insert).to.have.been.called();
  });

  it('should successfully insert a delivery for a user with a string address', () => {
    const user = Factory.create('user');
    const fakeDeliveryData = {
      address: faker.address.streetAddress(),
      deliveryMethod: {
        cost: faker.commerce.price(),
        _id: faker.lorem.word(),
        title: faker.lorem.word(),
      },
      deliveryDays: [new Date()],
    };
    chai.spy.on(Deliveries, 'insert');
    addDelivery(fakeDeliveryData, user._id);
    expect(Deliveries.insert).to.have.been.called();
  });
});
