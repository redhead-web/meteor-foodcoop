/* globals Sales:true */
import includes from 'lodash.includes';
import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';

Sales = new Mongo.Collection('sales');

function isAdmin(user) {
  return Roles.userIsInRole(user, 'admin');
}

Sales.allow({
  insert(userId) {
    // you can only order something for yourself
    if (isAdmin(userId)) { return true; }
    return false;
  },
  update(userId) {
    if (isAdmin(userId)) {
      // Admin's can update anything about a sale
      return true;
    } return false;
  },
  remove(userId) {
    return userId && isAdmin(userId);
  },
});

Sales.deny({
  fetch: ['user', 'status'],
  update(userId, sale, fields) {
    if (includes(fields, 'orderId')) {
      return true;
    } return false;
  },
});

export default Sales;
