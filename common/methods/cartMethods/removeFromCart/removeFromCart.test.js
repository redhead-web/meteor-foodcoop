/* eslint-env mocha */
/* globals Cart */


import faker from 'faker';
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { Roles } from 'meteor/alanning:roles';
import { expect, chai } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import spies from 'chai-spies';
import { removeFromCart } from './removeFromCart';
import { Products } from '../../../../imports/api/products';

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
  }),
});

Factory.define('products', Products, {
  name: faker.name.findName(),
  // producer: Factory.get('user')._id,
  producerName: faker.name.findName(),
  price: 10,
  unitOfMeasure: 'kg',
  category: 'Produce',
  published: true,
  carted() { return []; },
});

Factory.define('cartItem', Cart.Items, {
  // userId: Factory.get('user'),
  productId: 'someId',
  details: {
    price: 10,
  },
  qty: 1,
});

if (Meteor.isServer) {
  describe('removeFromCart Method', () => {
    beforeEach(() => {
      resetDatabase();
    });

    it('should fail when no argument provided', () => {
      expect(() => {
        removeFromCart();
      }).to.throw('Match error: Expected string, got undefined');
    });
    it('should fail when called with an id but no user logged in', () => {
      expect(() => {
        removeFromCart.call({ connection: true }, 'someId');
      }).to.throw('you don\'t have permission to call this method');
    });
    it('should remove a cart item when called with an admin userId', () => {
      const item = Factory.create('cartItem');
      const admin = Factory.create('user');
      Roles.addUsersToRoles(admin._id, 'admin');
      expect(Roles.userIsInRole(admin._id, 'admin')).to.be.true;
      chai.spy.on(Roles, 'userIsInRole');
      expect(() => {
        removeFromCart.call({ userId: admin._id }, item._id);
      }).to.not.throw();
      expect(Roles.userIsInRole).to.have.been.called.with(admin._id);
    });
    it('should remove a cart item when called', () => {
      const item = Factory.create('cartItem');
      expect(item._id).to.be.a('string');
      chai.spy.on(Cart.Items, 'remove');
      removeFromCart(item._id);
      expect(Cart.Items.remove).to.have.been.called();
      expect(Cart.Items.findOne(item._id)).to.not.be.ok;
    });
    it('should update the Products collection after being called', () => {
      const user = Factory.create('user');
      const product = Factory.create('product', { producer: user._id });
      expect(product._id).to.be.a('string');

      const item = Factory.create('cartItem', { productId: product._id, userId: user._id });

      Products.update(product._id,
        { $push: { carted: { qty: 1, user: user._id, timestamp: new Date() } } }
      );
      const p = Products.findOne(product._id);
      expect(p).to.exist;
      expect(p.carted[0].user).to.equal(user._id);

      expect(item._id).to.be.a('string');
      // Meteor.userId = () => user._id;
      expect(() => {
        const result = removeFromCart.call({ userId: user._id }, item._id);
        console.log(result);
      }).to.not.throw();
      expect(Products.findOne(product._id).carted).to.be.empty;
    });
  });
}
