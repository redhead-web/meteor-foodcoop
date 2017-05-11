// /* eslint-env mocha */
// /* globals Cart */
//
// import faker from 'faker';
// import { Factory } from 'meteor/dburles:factory';
// import { Products } from '../../../imports/api/products';
// import { Meteor } from 'meteor/meteor';
// import { expect, chai } from 'meteor/practicalmeteor:chai';
// import { Mailer } from 'meteor/lookback:emails';
// import spies from 'chai-spies';
//
// chai.use(spies);
//
// import { resetDatabase } from 'meteor/xolvio:cleaner';
//
// import { cartReminder } from './cartReminder.coffee';
//
// // Setup mock data
// Factory.define('user', Meteor.users, {
//   emails: () => [
//     { address: faker.internet.email() },
//   ],
//   profile: () => ({
//     name: faker.name.findName(),
//     companyName: faker.company.companyName(),
//     customerNumber: 16,
//       // lastOrder: [Factory.get('product'), Factory.get('product'), Factory.get('product')],
//       // favourites: [Factory.get('product'), Factory.get('product')]
//   }),
// });
// //
// Factory.define('product', Products, {
//   name: faker.lorem.word(),
//   producer: Factory.get('user'),
//   producerName: faker.name.findName(),
//   daysNotice: 5,
//   price: faker.random.number(1000),
//   stocklevel: 500,
//   unitOfMeasure: faker.lorem.word(),
//   category: 'Produce',
// });
//
// describe('earlyReminder Method', () => {
//   beforeEach(() => {
//     resetDatabase();
//   });
//
//   it('should be called from Method', () => {
//     chai.spy.on(cartReminder, 'apply');
//     Meteor.call('/email/cartReminder');
//     expect(cartReminder.apply).to.have.been.called();
//   });
//
//   it('should look for cart items', () => {
//     chai.spy.on(Cart.Items, 'find');
//     cartReminder();
//     expect(Cart.Items.find).to.have.been.called();
//   });
//
//   it('should not send an email if there are no cart items', () => {
//     expect(Cart.Items.find().count()).to.equal(0);
//     chai.spy.on(Mailer, 'send');
//     cartReminder();
//     expect(Mailer.send).to.not.have.been.called();
//   });
//
//   it('should send an email if there is a cart item', () => {
//     expect(Cart.Items.find().count()).to.equal(0);
//     const soup = Factory.create('product', { name: 'soup' });
//     const user = Factory.create('user');
//     expect(Meteor.users.findOne(user._id)._id).to.equal(user._id);
//     Cart.Items.insert({
//       productId: soup._id,
//       userId: user._id,
//       qty: 1,
//     });
//     expect(Cart.Items.find().count()).to.equal(1);
//     chai.spy.on(Mailer, 'send');
//     cartReminder();
//     expect(Mailer.send).to.have.been.called();
//   });
//   it('should increment the reminderLevel of the cart item', () => {
//     const soup = Factory.create('product', { name: 'soup' });
//     const user = Factory.create('user');
//     const cartItemId = Cart.Items.insert({
//       productId: soup._id,
//       userId: user._id,
//       qty: 2,
//     });
//     expect(Cart.Items.find().count()).to.equal(1);
//     chai.spy.on(Cart.Items, 'update');
//     chai.spy.on(Mailer, 'send');
//     cartReminder();
//     expect(Mailer.send).to.have.been.called();
//     // expect(Cart.Items.update).to.have.been.called();
//     expect(Cart.Items.findOne(cartItemId).reminderLevel).to.equal(1);
//   });
// });
