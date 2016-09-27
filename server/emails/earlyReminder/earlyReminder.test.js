// import { Factory } from 'meteor/dburles:factory';
// import { Products } from '../../../imports/api/products';
// import { Meteor } from 'meteor/meteor';
// import Likes from "meteor/redhead:like-useraccount";
//
// import { resetDatabase } from 'meteor/xolvio:cleaner';
//
// import {earlyShoppingReminder} from './earlyReminder'
//
// import faker from 'faker';
// //
//
// // Setup mock data
// Factory.define('user', Meteor.users, {
//   emails: () => [
//     {address: faker.internet.email()}
//   ],
//   profile: () => {
//     return {
//       name: faker.name.findName(),
//       companyName: faker.company.companyName(),
//       // lastOrder: [Factory.get('product'), Factory.get('product'), Factory.get('product')],
//       // favourites: [Factory.get('product'), Factory.get('product')]
//     }
//   }
// });
//
// Factory.define('likes', Likes, {
//   liker: () => faker.name.findName(), //Factory.get('user'),
//   likee: () => faker.name.findName() //Factory.get('user')
// });
// //
// Factory.define('product', Products, {
//   name: () => faker.lorem.word(),
//   producer: () => Factory.get('user'),
//   producerName: () => faker.name.findName(),
//   daysNotice: () => 5,
//   price: () => faker.random.number(1000),
//   stocklevel: () => 500
// })
// // const soup = Factory.create('product', {name: "soup"})
// console.log(Meteor.users.insert)
//
// // const like = Factory.create('likes')
// // const sean = Factory.create('user')
// // describe('earlyReminder Method', function () {
// //   beforeEach(function () {
// //     resetDatabase();
// //   });
// //
// //   it("should be able to call method and return valid data", function() {
// //     const soup = Factory.create('product', {name: "soup"})
// //     // result = earlyShoppingReminder()
// //     // console.log(result.likeRecipients);
// //     // console.log(result.favouriteRecipients);
// //
// //
// //   });
// //
// // });
