/* globals Orders:true */
import includes from 'lodash.includes';
import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';

Orders = new Mongo.Collection('orders');

function isAdmin(user) {
  return Roles.userIsInRole(user, 'admin');
}

Orders.allow({
  insert(userId, order) {
    // you can only order something for yourself
    if (isAdmin(userId)) { return true; }
    return userId && order.user === userId;
  },
  fetch: ['user', 'status'],
  update(userId) {
    return isAdmin(userId);
  },
  remove(userId) {
    return userId && isAdmin(userId);
  },
});

Orders.deny({
  fetch: ['user', 'status'],
  update(userId, subscription, fields, modifier) {
    if (includes(fields, 'user')) {
      return true;
    }

    if (subscription.status === 'cancelled' && !isAdmin(userId)) {
      return true;
    }
  },
});
